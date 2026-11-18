import type { CapabilityPageContent } from '../data/capabilities';
import { Accordion } from './Accordion';

export function CapabilityServiceSections({
  content,
}: {
  content: CapabilityPageContent;
}) {
  return (
    <>
      {content.audience && (
        <section className="case-section" aria-labelledby="capability-audience">
          <div
            data-section-reveal
            className="case-page-width grid items-start gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div data-reveal>
              <p className="type-eyebrow mb-5">Who it is for</p>
              <h2
                id="capability-audience"
                className="type-section-heading text-navy"
              >
                {content.audience.heading}
              </h2>
            </div>
            <div data-reveal className="max-w-[var(--layout-article)]">
              <p className="type-article-lede text-navy">
                {content.audience.body}
              </p>
              <p className="type-article-body mt-fluid-6">
                {content.audience.boundary}
              </p>
            </div>
          </div>
        </section>
      )}
      {content.engagement && (
        <section
          id="how-it-starts"
          className="case-section bg-cool"
          aria-labelledby="capability-engagement"
        >
          <div className="case-page-width">
            <div data-section-reveal>
              <p data-reveal className="type-eyebrow mb-5">
                How it starts
              </p>
              <h2
                data-reveal
                id="capability-engagement"
                className="type-section-heading text-navy mb-fluid-8"
              >
                {content.engagement.heading}
              </h2>
            </div>
            <ol className="grid gap-6 lg:grid-cols-3">
              {content.engagement.steps.map((step) => (
                <li
                  key={step.title}
                  data-section-reveal
                  data-reveal-self
                  className="border-t border-divider pt-6"
                >
                  <h3 className="type-card-title text-navy">{step.title}</h3>
                  <p className="type-article-body mt-4">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {content.faq && content.faq.length > 0 && (
        <section className="case-section" aria-labelledby="capability-faq">
          <div className="case-page-width grid items-start gap-fluid-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="type-eyebrow mb-5">FAQ</p>
              <h2
                id="capability-faq"
                className="type-section-heading text-navy"
              >
                A few things
                <br />
                worth knowing
              </h2>
            </div>
            <Accordion items={content.faq} />
          </div>
        </section>
      )}
    </>
  );
}
