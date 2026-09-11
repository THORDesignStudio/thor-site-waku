import { SEO } from '../../components/SEO';
import {
  TabbedWorkShowcase,
  type TabbedWorkItem,
} from '../../components/TabbedWorkShowcase';

const aerospaceWork: TabbedWorkItem[] = [
  {
    id: 'spacex',
    name: 'SpaceX',
    logo: '/images/verticals/aerospace/spacex.svg',
    image: '/images/verticals/aerospace/space-x-starship.webp',
    imagePosition: 'center',
    eyebrow: 'Space systems · Digital storytelling',
    title: 'Making the next frontier feel within reach',
    description:
      'Placeholder project copy: an immersive digital experience that translates ambitious engineering, mission milestones, and complex flight systems into a story built for a broad audience.',
    quote:
      'The strongest aerospace stories pair technical authority with a sense of scale, momentum, and human possibility.',
    quoteAttribution: 'THOR Studio · Project principle',
    details: [
      { label: 'Focus', value: 'Mission storytelling' },
      { label: 'Experience', value: 'Interactive web' },
    ],
  },
  {
    id: 'boom',
    name: 'Boom Supersonic',
    logo: '/images/verticals/aerospace/boom.svg',
    image: '/images/verticals/aerospace/boom-xb-1.webp',
    imagePosition: 'center',
    eyebrow: 'Aviation · Product narrative',
    title: 'Reintroducing the world to supersonic flight',
    description:
      'Placeholder project copy: a product-led platform that connects a new aircraft program to the performance, testing, and design decisions behind the return of commercial supersonic travel.',
    quote:
      'When the product is unprecedented, the experience has to make its performance understandable before it can make it inspiring.',
    quoteAttribution: 'THOR Studio · Project principle',
    details: [
      { label: 'Focus', value: 'Product launch' },
      { label: 'Experience', value: 'Visual narrative' },
    ],
  },
  {
    id: 'nasa',
    name: 'NASA',
    logo: '/images/verticals/aerospace/nasa.svg',
    image: '/images/verticals/aerospace/nasa-space-race.webp',
    imagePosition: 'center',
    eyebrow: 'Exploration · Editorial experience',
    title: 'Giving a new space race meaningful context',
    description:
      'Placeholder project copy: an editorial experience that turns programs, timelines, and competing approaches into an accessible visual story about the future of lunar exploration.',
    quote:
      'Editorial design can make dense technical comparisons feel intuitive without losing the detail that gives them credibility.',
    quoteAttribution: 'THOR Studio · Project principle',
    details: [
      { label: 'Focus', value: 'Data-rich editorial' },
      { label: 'Experience', value: 'Feature story' },
    ],
  },
];

export default function AerospacePage() {
  return (
    <>
      <SEO
        title="Aerospace Design and Development | THOR Studio"
        description="Digital strategy, design, and development for organizations shaping the future of aerospace."
        canonicalUrl="https://www.thor-studio.com/verticals/aerospace"
        ogImage="/images/verticals/aerospace.jpg"
        ogImageAlt="THOR Studio aerospace design and web development"
        ogImageWidth={1728}
        ogImageHeight={916}
      />

      <div className="w-full overflow-hidden bg-[#080b24]">
        <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-[#080b24] px-fluid-6 pb-fluid-10 pt-40 text-white lg:min-h-[78svh] lg:pb-fluid-12">
          <img
            src="/images/verticals/aerospace.jpg"
            alt=""
            width="1728"
            height="916"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,11,36,0.08)_20%,rgba(8,11,36,0.88)_100%)]" />

          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <h1 className="max-w-[1250px] text-fluid-6xl font-bold leading-[0.9] tracking-tight sm:text-fluid-7xl lg:text-fluid-8xl">
              Digital experiences for aerospace that move beyond the horizon.
            </h1>
            <p className="mt-fluid-5 max-w-[720px] text-fluid-lg font-light leading-relaxed text-white/65">
              THOR helps aerospace organizations turn advanced technology into
              clear, compelling stories for customers, partners, and the public.
            </p>
          </div>
        </section>

        <TabbedWorkShowcase
          items={aerospaceWork}
          heading="Work delivered with no margin for ordinary"
          tabListLabel="Featured aerospace work"
        />
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
