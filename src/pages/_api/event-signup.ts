import { getEnv } from 'waku';

const EVENT_TITLE = 'Healthcare Marketing in 2026';
const EVENT_TIME = 'September 3, 2026 at 12 PM CT';
const EVENT_MEET_URL = 'https://meet.google.com/gqe-mfxu-xmd';
const TURNSTILE_ACTION = 'event_signup';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TurnstileResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body: unknown = await request.json();
    if (!isRecord(body)) return invalidRequest();

    const fullName = cleanField(body.fullName);
    const role = cleanField(body.role);
    const email = cleanField(body.email).toLowerCase();
    const turnstileToken = cleanField(body.turnstileToken);

    if (
      !fullName ||
      fullName.length > 100 ||
      !role ||
      role.length > 100 ||
      !email ||
      email.length > 254 ||
      !EMAIL_PATTERN.test(email) ||
      !turnstileToken ||
      turnstileToken.length > 2048
    ) {
      return invalidRequest();
    }

    const turnstileSecret = getEnv('CF_TURNSTILE_SECRET_KEY');
    if (!turnstileSecret) {
      console.error('Event signup: CF_TURNSTILE_SECRET_KEY is not configured');
      return serverError();
    }

    const clientIp = request.headers
      .get('x-forwarded-for')
      ?.split(',')[0]
      ?.trim();
    const verificationBody = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
    });
    if (clientIp) verificationBody.set('remoteip', clientIp);

    let turnstileResult: TurnstileResult;
    try {
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: verificationBody,
          signal: AbortSignal.timeout(10_000),
        }
      );
      if (!turnstileResponse.ok)
        throw new Error(`Siteverify returned ${turnstileResponse.status}`);
      turnstileResult = (await turnstileResponse.json()) as TurnstileResult;
    } catch (error) {
      console.error(
        'Event signup: Turnstile verification request failed',
        error
      );
      return forbidden();
    }

    const requestHostname = new URL(request.url).hostname;
    const expectedHostnames = getExpectedHostnames(requestHostname);
    if (
      !turnstileResult.success ||
      turnstileResult.action !== TURNSTILE_ACTION ||
      !turnstileResult.hostname ||
      !expectedHostnames.has(turnstileResult.hostname)
    ) {
      return forbidden();
    }

    const resendApiKey = getEnv('RESEND_API_KEY');
    const senderEmail = getEnv('CF_SENDER_EMAIL');
    if (!resendApiKey || !senderEmail) {
      console.error('Event signup: Resend configuration is missing');
      return serverError();
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `THOR Website <${senderEmail}>`,
        to: ['john@thor-studio.com', 'colby@thor-studio.com'],
        reply_to: `${fullName} <${email}>`,
        subject: `${EVENT_TITLE} Registration`,
        text: `New event registration from the THOR Studio website.

Name: ${fullName}
Role: ${role}
Email: ${email}

Event: ${EVENT_TITLE}
When: ${EVENT_TIME}
Google Meet: ${EVENT_MEET_URL}

---
Submitted via the THOR Studio events page`,
        html: `<p><strong>New event registration from the THOR Studio website.</strong></p>
<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
<p><strong>Role:</strong> ${escapeHtml(role)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<hr>
<p><strong>Event:</strong> ${EVENT_TITLE}</p>
<p><strong>When:</strong> ${EVENT_TIME}</p>
<p><strong>Google Meet:</strong> <a href="${EVENT_MEET_URL}">${EVENT_MEET_URL}</a></p>
<p><em>Submitted via the THOR Studio events page</em></p>`,
      }),
    });

    if (!emailResponse.ok) {
      console.error('Event signup: Resend returned', emailResponse.status);
      return serverError();
    }

    return Response.json(
      { success: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Event signup error:', error);
    return serverError();
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const cleanField = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

const getExpectedHostnames = (requestHostname: string): Set<string> => {
  const configuredHostnames = getEnv('CF_TURNSTILE_HOSTNAMES')
    ?.split(',')
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (configuredHostnames?.length) return new Set(configuredHostnames);
  if (requestHostname === 'localhost' || requestHostname === '127.0.0.1') {
    return new Set(['localhost', '127.0.0.1']);
  }
  return new Set(['www.thor-studio.com', 'thor-studio.com']);
};

const invalidRequest = () =>
  Response.json({ error: 'Invalid registration details' }, { status: 400 });

const forbidden = () =>
  Response.json({ error: 'Security verification failed' }, { status: 403 });

const serverError = () =>
  Response.json(
    { error: 'Unable to submit registration' },
    { status: 500, headers: { 'Cache-Control': 'no-store' } }
  );

const escapeHtml = (value: string): string => {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return value.replace(
    /[&<>"']/g,
    (character) => entities[character] ?? character
  );
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
