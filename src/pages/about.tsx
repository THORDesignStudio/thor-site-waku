import { staff, type Staff } from '../data/staff.js';

export default async function AboutPage() {
  // Get all staff members from the first staff list
  const allStaff = staff[0]?.staff ?? [];

  // Filter featured members (Colby and John get full-width layout)
  const featuredMembers = allStaff.filter((member: Staff) => member.featured);

  // Grid members are non-featured staff, sorted alphabetically by name
  const gridMembers = allStaff
    .filter((member: Staff) => !member.featured)
    .sort((a: Staff, b: Staff) => a.name.localeCompare(b.name));
  return (
    <>
      <title>About | THOR Digital</title>
      <meta name="description" content="Meet the team behind THOR Digital - a collective of designers, developers, and digital experts." />
      <link rel="canonical" href="https://www.thor-studio.com/about" />
      <meta property="og:title" content="About | THOR Digital" />
      <meta property="og:description" content="Meet the team behind THOR Digital - a collective of designers, developers, and digital experts." />
      <meta property="og:image" content="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg" />
      <meta property="og:url" content="https://www.thor-studio.com/about" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About | THOR Digital" />
      <meta name="twitter:description" content="Meet the team behind THOR Digital - a collective of designers, developers, and digital experts." />
      <meta name="twitter:image" content="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg" />

      <section className="relative min-h-[50vh] overflow-hidden bg-[#0B0F3C]">
        <div className="relative z-10 min-h-[50vh] mx-auto max-w-[1350px] px-fluid-6 py-fluid-24">
          <h1 className="mb-fluid-8 text-fluid-8xl font-display leading-tight tracking-fluid-tight text-white">
            ABOUT THOR
          </h1>
          <div className="max-w-3xl">
            <p className="section-subtitle font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal">
              THOR is a collective of designers, developers, and digital experts
              creating tailored solutions and premier publications. For over 15
              years, we've blended creativity and technology to craft
              user-focused websites, apps, and media that exceed expectations
              and drive lasting success.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Team Members */}
      {featuredMembers.map((member: Staff, index: number) => (
        <section
          key={member.name}
          className="relative overflow-hidden bg-night"
        >
          <FeaturedTeamMember member={member} index={index} />
        </section>
      ))}

      {/* Team Grid Section */}
      <section className="bg-night py-fluid-10">
        <div className="mx-auto max-w-[1600px] px-fluid-6">
          <div className="grid gap-fluid-12 grid-cols-1">
            {gridMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Featured Team Member Component (Full-width layout for featured staff)
function FeaturedTeamMember({
  member,
  index,
}: {
  member: Staff;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const isPortrait = isEven; // Even indices (0, 2, 4...) are portrait images

  return (
    <div className="relative min-h-[70vh]">
      {/* Smoke Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/smoke-scene/smoke-bg-combined.jpg)`,
          transform: isEven ? undefined : 'rotate(180deg)',
        }}
      />

      {/* Content wrapper with max-width constraint */}
      <div className="relative mx-auto max-w-[1600px] px-fluid-6 flex flex-col lg:flex-row min-h-[70vh]">
        {/* Text Content */}
        <div className="relative flex-1 pt-fluid-8 lg:pt-fluid-16 z-10 lg:max-w-[50%]">
          {/* Name and Role */}
          <h2 className="mb-fluid-4 text-fluid-4xl font-semibold leading-[1.1] uppercase tracking-fluid-tight text-white">
            {member.name} <span className="text-pink block">{member.role}</span>
          </h2>

          {/* Bio */}
          <p className="font-sans font-light text-fluid-xl text-cream mt-fluid-2 leading-normal">
            {member.bio}
          </p>
        </div>

        {/* Image - pinned to bottom */}
        {isPortrait ? (
          // Portrait layout for even indices
          <div className="relative w-full lg:w-[45%] z-10 lg:absolute lg:bottom-0 lg:right-0">
            <img
              src={member.image}
              alt={member.name}
              className="h-[600px] lg:h-[800px] w-full object-contain"
            />
          </div>
        ) : (
          // Landscape layout for odd indices
          <div className="relative h-[600px] w-full md:w-[450px] lg:absolute lg:bottom-0 lg:-right-20 xl:right-0 lg:h-[70vh] lg:w-[60%] xl:w-[45%] z-10">
            <div
              className="absolute inset-0 bg-cover bg-bottom"
              style={{
                backgroundImage: `url(${member.image})`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Team Card Component (Grid layout for other members)
function TeamCard({ member }: { member: Staff }) {
  return (
    <div className="flex gap-fluid-4 md:items-start md:flex-row flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden h-[300px] w-[300px] lg:shrink-0">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-night/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 md:px-fluid-6 pb-fluid-2">
        {/* Name and Role */}
        <h2
          className="mb-fluid-3 text-fluid-3xl font-sans font-extrabold leading-snug text-white uppercase"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {member.name}
          <span className="text-pink block text-fluid-2xl">{member.role}</span>
        </h2>

        {/* Bio */}
        <p
          className="font-sans font-light text-fluid-xl text-cream mt-fluid-2 leading-normal"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
