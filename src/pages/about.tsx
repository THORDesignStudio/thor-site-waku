import { staff, type Staff } from '../data/staff';
import { SEO } from '../components/SEO';
import { PageHero } from '../components/PageHero';
import { CapabilityPageMotion } from '../components/CapabilityPageMotion';
import { ChallengePromo } from '../components/ChallengePromo';

function Biography({
  member,
  className,
}: {
  member: Staff;
  className: string;
}) {
  return (
    <div className={`${className} space-y-fluid-4`}>
      {member.bio.split(/\n\n+/).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const allStaff = staff[0]?.staff ?? [];
  const principals = allStaff.filter((member) => member.featured);
  const team = allStaff
    .filter((member) => !member.featured)
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <SEO
        title="About | THOR Digital"
        description="Meet the principals, designers, developers and digital experts behind THOR Digital."
        canonicalUrl="https://www.thor-studio.com/about"
        ogImage="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
      />
      <CapabilityPageMotion>
        <PageHero
          title="About"
          highlight="THOR"
          className="capability-hero"
          subtitle="THOR is a collective of designers, developers, and digital experts that builds custom solutions and publications. For more than 15 years we’ve combined creativity and technology into user-focused websites, apps, and media."
        >
          <p className="type-eyebrow !text-on-dark">
            Discoverers of elusive solutions. Purveyors of fine design.
          </p>
        </PageHero>
        <section
          aria-labelledby="principals-heading"
          className="bg-white py-fluid-12"
        >
          <div className="mx-auto max-w-[var(--layout-page)] px-fluid-6">
            <div className="flex flex-wrap items-end justify-between gap-fluid-6">
              <div>
                <p className="type-eyebrow mb-4">Principals</p>
                <h2
                  id="principals-heading"
                  className="type-section-heading text-navy scroll-mt-[calc(var(--site-header-clearance)+1rem)]"
                >
                  Who you’ll work with
                </h2>
              </div>
              <a className="link-card" href="/work-with-us">
                Start a project with THOR <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="mt-fluid-10 space-y-fluid-12">
              {principals.map((member, index) => (
                <article
                  key={member.name}
                  aria-labelledby={`principal-${index}`}
                  className="grid items-center gap-fluid-8 lg:grid-cols-2 lg:gap-fluid-12"
                  {...(index > 0 ? { 'data-section-reveal': true } : {})}
                >
                  <div
                    data-reveal
                    className={`relative isolate my-12 h-64 rounded-2xl bg-navy bg-cover bg-center sm:my-16 sm:h-[340px] ${index % 2 ? 'lg:order-2' : ''}`}
                    style={{
                      backgroundImage:
                        "url('/images/smoke-scene/smoke-bg-combined.jpg')",
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      width={member.imageWidth}
                      height={member.imageHeight}
                      className="absolute -bottom-12 left-1/2 h-[calc(100%+6rem)] w-full -translate-x-1/2 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div data-reveal>
                    <p className="type-eyebrow mb-4">{member.role}</p>
                    <h3
                      id={`principal-${index}`}
                      className="type-section-heading text-navy"
                    >
                      {member.name}
                    </h3>
                    <Biography
                      member={member}
                      className="type-article-body mt-fluid-6"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section aria-labelledby="team-heading" className="bg-cool py-fluid-12">
          <div className="mx-auto max-w-[var(--layout-page)] px-fluid-6">
            <div data-section-reveal>
              <div data-reveal>
                <p className="type-eyebrow mb-4">The team</p>
                <h2
                  id="team-heading"
                  className="type-section-heading text-navy"
                >
                  Senior people, small team
                </h2>
              </div>
            </div>
            <div className="mt-fluid-10 grid gap-x-fluid-8 gap-y-fluid-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article key={member.name} data-section-reveal data-reveal-self>
                  <img
                    src={member.image}
                    alt={member.name}
                    width={member.imageWidth}
                    height={member.imageHeight}
                    loading="lazy"
                    className="aspect-[5/6] w-full rounded-2xl object-cover"
                  />
                  <p className="type-eyebrow mt-6 mb-3">{member.role}</p>
                  <h3 className="type-card-title text-navy">{member.name}</h3>
                  <Biography
                    member={member}
                    className="type-card-summary mt-3"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
        <ChallengePromo />
      </CapabilityPageMotion>
    </>
  );
}

export const getConfig = async () => ({ render: 'static' }) as const;
