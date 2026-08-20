import {
  AerospaceSpotlight,
  FlagshipPublications,
} from '../../components/PublicationsCarousels';
import { SEO } from '../../components/SEO';
import { awardImages, magazines } from '../../data/publications';

const editorialHeadingStyle = {
  fontFamily: "'utopia-std', serif",
} as const;

export default function PublicationsPage() {
  return (
    <>
      <SEO
        title="Publication Design | THOR Studio"
        description="Award-winning editorial design, publication redesign, illustration, and production from THOR Studio."
        canonicalUrl="https://www.thor-studio.com/verticals/publications"
        ogImage="/images/verticals/publications-media.jpg"
        ogImageAlt="THOR Studio publication and editorial design"
        ogImageWidth={2000}
        ogImageHeight={1121}
      />

      <div className="w-full overflow-hidden bg-white">
        <section className="relative flex min-h-[min(920px,100svh)] items-center justify-center overflow-hidden bg-[#0f1847] px-fluid-6 pb-fluid-12 pt-36 text-white">
          <img
            src="/images/verticals/publications-media.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            width="2000"
            height="1121"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#0f1847]/25" />
          <h1 className="relative z-10 w-full max-w-[1200px] text-center text-fluid-5xl font-bold leading-tight tracking-tight sm:text-fluid-7xl md:text-fluid-8xl">
            THOR lives and breathes
            <span className="block">editorial design</span>
          </h1>
        </section>

        <FlagshipPublications />

        <section aria-label="Aerospace America environmental campaign">
          <img
            src="/images/verticals/publications-aa.jpg"
            alt="Aerospace America campaign displayed in a public lobby"
            className="aspect-[1724/1149] h-auto w-full object-cover"
            width="1600"
            height="1066"
            loading="lazy"
          />
        </section>

        <AerospaceSpotlight />

        <section className="bg-[#0f1847] px-fluid-6 py-fluid-10 text-white">
          <h2
            className="mx-auto max-w-[1300px] text-center text-fluid-6xl font-normal leading-tight tracking-tight text-balance"
            style={editorialHeadingStyle}
          >
            A Legacy of Satisfied Clients
          </h2>
        </section>

        <section aria-label="Selected publication covers">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {magazines.map((magazine) => (
              <article
                key={magazine.name}
                className="relative isolate flex aspect-[600/827] items-center justify-center overflow-hidden p-[12%]"
              >
                <img
                  src={magazine.texture}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  width="600"
                  height="827"
                  loading="lazy"
                />
                <img
                  src={magazine.cover}
                  alt={`${magazine.name} magazine cover`}
                  className="h-auto max-h-full w-[82%] object-contain shadow-[16px_18px_30px_rgba(0,0,0,0.35)]"
                  width="459"
                  height="595"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-fluid-6 py-fluid-12 text-black">
          <h2
            className="mx-auto max-w-[1200px] text-center text-fluid-6xl font-bold leading-tight tracking-tight text-balance"
            style={editorialHeadingStyle}
          >
            1000s of individual issues, every one produced at the highest
            standard
          </h2>

          <div className="mx-auto mt-fluid-8 grid max-w-[1320px] grid-cols-2 gap-fluid-3 sm:grid-cols-3 lg:grid-cols-5">
            {awardImages.map((image) => (
              <img
                key={image}
                src={image}
                alt=""
                className="aspect-square h-auto w-full object-contain"
                width="254"
                height="254"
                loading="lazy"
                aria-hidden="true"
              />
            ))}
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
