# About and contact

- `/about` uses the shared hero, white alternating principal profiles, cool-background three-column team grid and ChallengePromo. Principals retain source order; other staff sort alphabetically.
- `src/data/staff.ts` remains the source of all eight names, roles, full biographies and original portraits. Image dimensions come from the existing assets; split biography paragraphs on blank lines.
- The hero and first principal stay static. Later principal/team cards and closing CTA reuse `CapabilityPageMotion`. Each team card has its own reveal trigger.
- `/work-with-us` is a static standalone presentation with a light form on the shared smoke background. About links to it; its Meet the principals link returns to the About section.
- Header Work With Us and the floating chat button still open the existing overlay. The footer shader and contact API are unchanged.
- `useContactForm` shares state/submission logic between the page and header. `ContactFields` shares the real fields and feedback; `ContactForm` retains overlay presentation and native internal scrolling.
- Keep the existing JSON POST `/contact` contract: name, email, message and turnstileToken. No company/capability fields until the backend contract supports them.
- A synchronous request ref prevents duplicate submissions. Clear/unmount abort pending requests; success clears fields, errors preserve them; every attempt resets the security widget and requires a fresh token.
- Result messages receive focus. Inputs remain at least 16px; hidden header forms/navigation are inert. Standalone page uses ordinary document scrolling.
- The page chooses compact/flexible Turnstile from actual widget-container width (300px minimum). Opening the header overlay deactivates the page widget; closing restores it. Header form layout still switches at 640px.
- `useTurnstile` shares one script with per-instance load listeners and cleanup; late script loads must not initialize unmounted widgets. Event signup retains its existing action and independent widget.
- Analytics retain begin_contact and generate_lead, distinguished by header_nav/contact_page. Verification uses mocked Turnstile and POST responses; no live email is sent by tests.
- Global navigation order: About Us, How We Work, Capabilities, Case Studies. Mobile navigation shows below 768px; desktop starts at 768px. Do not conflate this with the 640px contact-form layout breakpoint.
