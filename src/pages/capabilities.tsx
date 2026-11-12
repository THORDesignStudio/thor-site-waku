import { getPublishedCapabilities } from '../data/capabilities';
import { PageHero } from '../components/PageHero';
import { ChallengePromo, ContactButton } from '../components/ChallengePromo';
import { SEO } from '../components/SEO';

export default function CapabilitiesPage() {
  const capabilities = getPublishedCapabilities();

  return (
    <>
      <SEO
        title="Capabilities | THOR Digital"
        description="Explore THOR’s capabilities in strategy, design and development, from brands and publications to websites, apps and data visualization."
        canonicalUrl="https://www.thor-studio.com/capabilities"
        ogImage="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
      />
      <div>
        <PageHero
          title="Our"
          highlight="capabilities"
          eyebrow="What we do"
          subtitle="Strategy, design and development. Working together."
          className="capability-hero"
        >
          <ContactButton />
        </PageHero>

        <section
          className="bg-cool py-[var(--layout-section)]"
          aria-labelledby="capabilities-grid-heading"
        >
          <div className="mx-auto max-w-[var(--layout-hero)] px-fluid-6">
            <div className="mb-fluid-6">
              <h2
                id="capabilities-grid-heading"
                className="type-eyebrow !text-navy"
              >
                Explore our capabilities
              </h2>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <li key={capability.slug}>
                  <a
                    href={capability.url}
                    className="group flex h-full flex-col rounded-3xl border border-divider bg-white p-6 text-navy transition-[border-color,box-shadow] duration-200 hover:border-magenta hover:shadow-lg motion-reduce:transition-none md:p-8"
                    aria-labelledby={`capability-${capability.slug}-title`}
                    aria-describedby={`capability-${capability.slug}-summary`}
                  >
                    <h3
                      id={`capability-${capability.slug}-title`}
                      className="type-card-title text-navy"
                    >
                      {capability.name}
                    </h3>
                    <p
                      id={`capability-${capability.slug}-summary`}
                      className="type-card-summary mt-3"
                    >
                      {capability.dek}
                    </p>
                    <span
                      className="link-card mt-auto flex items-center justify-between gap-4 pt-6"
                      aria-hidden="true"
                    >
                      Explore capability
                      <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                        →
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <ChallengePromo />
      </div>
    </>
  );
}

export const getConfig = async () => ({ render: 'static' }) as const;
