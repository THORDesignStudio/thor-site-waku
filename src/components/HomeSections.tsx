import {
  getHomeDisciplines,
  getHomeVerticals,
  homeSocial,
} from '../data/home-sections';

export function HomeSections() {
  return (
    <>
      <section
        aria-labelledby="home-capabilities"
        data-section-reveal
        className="bg-navy text-white"
      >
        <div className="home-section-inner mx-auto max-w-[var(--layout-page)] px-fluid-6 py-fluid-12">
          <div data-reveal className="grid gap-fluid-8 lg:grid-cols-2">
            <h2 id="home-capabilities" className="type-section-heading">
              What we do
            </h2>
            <div>
              <p className="type-page-lede text-on-dark">
                THOR is a studio that offers a wide array of capabilities to our
                clients.
              </p>
              <a
                href="/capabilities"
                className="link-card mt-5 inline-block !text-white"
              >
                Explore our capabilities <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-fluid-10 grid gap-fluid-8 lg:grid-cols-3">
            {getHomeDisciplines().map((discipline, index) => (
              <article
                key={discipline.title}
                data-section-reveal
                data-reveal-self
                className="home-capability-group flex flex-col border-t-4 border-magenta pt-fluid-6"
              >
                <p className="type-eyebrow mb-3">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="type-section-heading text-white">
                  {discipline.title}
                </h3>
                <p className="type-card-summary !text-on-dark mt-fluid-4">
                  {discipline.description}
                </p>
                <ul className="mt-fluid-6 divide-y divide-white/20 border-y border-white/20">
                  {discipline.capabilities.map((capability) => (
                    <li key={capability.url}>
                      <a
                        href={capability.url}
                        className="flex min-h-12 items-center justify-between gap-4 py-3 text-base text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
                      >
                        {capability.name}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                {discipline.proof && (
                  <a
                    href={`/case-studies/${discipline.proof.slug}`}
                    className="link-card mt-auto block pt-fluid-6 !text-white"
                  >
                    Proof: {discipline.proof.name}{' '}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-labelledby="home-verticals"
        data-section-reveal
        className="bg-white"
      >
        <div className="home-section-inner mx-auto max-w-[var(--layout-page)] px-fluid-6 py-fluid-12">
          <div data-reveal className="grid gap-fluid-8 lg:grid-cols-2">
            <p className="type-eyebrow md:hidden">Where we work</p>
            <h2 id="home-verticals" className="type-section-heading text-navy">
              Where we work
            </h2>
            <p className="type-page-lede text-navy">
              Deep expertise in the three sectors where serious content matters
              most.
            </p>
          </div>
          <div className="mt-fluid-10 grid gap-fluid-6 md:grid-cols-3">
            {getHomeVerticals().map((vertical) => (
              <a
                key={vertical.url}
                href={vertical.url}
                data-section-reveal
                data-reveal-self
                className="home-vertical-card relative isolate flex aspect-[4/5] items-end overflow-hidden rounded-2xl bg-navy p-fluid-6 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
              >
                <img
                  src={vertical.image}
                  alt=""
                  width={1600}
                  height={897}
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/95 to-navy/20"
                />
                <span>
                  <span className="type-card-title block">{vertical.name}</span>
                  <span className="mt-3 block text-xs font-extrabold uppercase tracking-widest">
                    Find out how <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-labelledby="home-follow"
        data-section-reveal
        className="bg-cool"
      >
        <div className="home-section-inner mx-auto max-w-[var(--layout-page)] px-fluid-6 py-fluid-12">
          <div data-reveal>
            <p className="type-eyebrow mb-4">Stay in touch</p>
            <h2 id="home-follow" className="type-section-heading text-navy">
              Follow <span className="text-magenta">THOR</span>
            </h2>
          </div>
          <div className="mt-fluid-10 grid gap-fluid-8 lg:grid-cols-2">
            {homeSocial.map((social) => (
              <article
                key={social.name}
                data-section-reveal
                data-reveal-self
                className="home-social-card min-w-0 rounded-2xl bg-white p-fluid-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div>
                    <h3 className="type-card-title text-navy">{social.name}</h3>
                    <p className="type-card-summary mt-2">
                      {social.description}
                    </p>
                  </div>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-card inline-flex min-h-11 items-center"
                  >
                    <span className="max-md:sr-only">
                      Follow on {social.name}
                    </span>
                    <span aria-hidden="true" className="ml-2">
                      ↗
                    </span>
                  </a>
                </div>
                <div
                  className={`mt-fluid-6 grid gap-3 ${social.images.length > 1 ? 'grid-cols-3' : ''}`}
                >
                  {social.images.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      className={`w-full rounded-xl object-cover ${social.images.length > 1 ? 'aspect-square' : 'aspect-[4/1]'}`}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
