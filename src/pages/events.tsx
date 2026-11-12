import { SEO } from '../components/SEO';
import { EventSignupForm } from '../components/EventSignupForm';

export default function EventsPage() {
  return (
    <>
      <SEO
        title="Events | THOR Studio"
        description="Explore THOR Studio’s conversations and events on healthcare marketing, design, and digital strategy."
        canonicalUrl="https://www.thor-studio.com/events"
        ogImage="/images/medical-event.jpg"
        ogImageAlt="A healthcare professional illuminated in blue and pink light"
        ogImageWidth={1726}
        ogImageHeight={852}
      />

      <div className="w-full overflow-hidden bg-white">
        <section className="relative flex min-h-[min(920px,100svh)] items-center justify-center overflow-hidden bg-[#0f1847] px-fluid-6 pb-fluid-12 pt-36 text-white">
          <img
            src="/images/medical-event.jpg"
            alt="A healthcare professional illuminated in blue and pink light"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width="1726"
            height="852"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#0f1847]/10" />
          <h1 className="relative z-10 w-full max-w-[1300px] text-center font-sans text-fluid-6xl font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-fluid-8xl">
            Join the conversation
          </h1>
        </section>

        <section className="bg-[#0f1847] px-fluid-6 pb-fluid-12 pt-fluid-6 text-white sm:pb-fluid-16">
          <div className="mx-auto max-w-[1219px]">
            <div className="py-fluid-5 sm:py-fluid-6">
              <p className="font-sans text-fluid-lg font-extrabold uppercase tracking-[-0.02em] text-magenta sm:text-fluid-xl">
                Upcoming Event
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2.25rem,3.2vw,3.45rem)] font-normal leading-tight tracking-[-0.02em]">
                Healthcare Marketing in 2026
              </h2>
              <p className="mt-4 max-w-[1180px] font-sans text-fluid-xl font-normal leading-relaxed sm:text-[clamp(1.5rem,1.6vw,1.72rem)]">
                Join us for a roundtable discussion on the evolving landscape of
                healthcare marketing. This exclusive gathering will bring
                together industry professionals to exchange ideas, share
                what&apos;s working—and what isn&apos;t—and learn from one
                another&apos;s experiences.
              </p>
              <p className="mt-6 font-sans text-fluid-lg font-extrabold uppercase tracking-[-0.02em] text-[#f7c574] sm:text-fluid-xl">
                Virtual Event <span aria-hidden="true">&nbsp; | &nbsp;</span>
                September 3, 2026 at 12 PM CT
              </p>
            </div>

            <div className="border-t border-white/65 pt-fluid-5 sm:pt-fluid-6">
              <p className="max-w-[1219px] font-sans text-fluid-xl leading-relaxed sm:text-[clamp(1.5rem,1.6vw,1.72rem)]">
                If you&apos;ve already signed up, we&apos;ll see you there! If
                you would like to join, please share your information and we
                will add you to the event.
              </p>
              <EventSignupForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
