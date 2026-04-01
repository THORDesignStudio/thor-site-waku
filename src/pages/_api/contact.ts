import { getEnv } from 'waku';

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = await request.json();
    const { name, email, message, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !message || !turnstileToken) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Verify Turnstile token with Cloudflare
    const turnstileSecret = getEnv('CF_TURNSTILE_SECRET_KEY');
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret!,
          response: turnstileToken,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();
    if (!turnstileData.success) {
      return Response.json(
        { error: 'Turnstile verification failed' },
        { status: 400 }
      );
    }

    // 2. Send email via Resend API
    const resendApiKey = getEnv('RESEND_API_KEY');
    const senderEmail = getEnv('CF_SENDER_EMAIL');

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${senderEmail}`,
        to: ['colby@thor-studio.com', 'john@thor-studio.com'],
        reply_to: email,
        subject: 'Working with THOR',
        text: `New contact form submission from the THOR Studio website.

Name: ${name}
Email: ${email}

Message:
${message}

---
Submitted via THOR Studio contact form`,
        html: `<p><strong>New contact form submission from the THOR Studio website.</strong></p>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
<hr>
<p><em>Submitted via THOR Studio contact form</em></p>`,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Email sending failed:', errorData);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
};

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m] ?? m);
}

// API routes are dynamic by default in Waku
export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
