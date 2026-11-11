import type { CapabilityPageContent } from './capabilities';

// Complete capability body copy from the design handoff; Publication Design
// uses the existing site content. Project selection remains tag-driven.
export const capabilityPages = {
  'web-development': {
    status: 'ready',
    title: 'Web',
    highlight: 'development',
    overviewHeading: 'Performant sites, built around your goals',
    overviewIntro:
      'THOR Digital builds high-performance websites that combine strong visual design with exceptional usability. With clients across a wide range of industries, every project we undertake is unique, and we pride ourselves on developing custom solutions tailored to each client’s goals.',
    overviewBody:
      'Our agile development process keeps projects moving efficiently from concept to launch. Through iterative sprints, we collaborate closely with our clients at every stage, maintaining clarity, momentum, and alignment throughout the project lifecycle. We’re always pushing boundaries and staying ahead of the rapid pace of technology. Our developers use performance-focused technologies and best practices to ensure reliability and lightning-fast load times.',
    platforms: [
      {
        title: 'Fully custom sites',
        description:
          'Advanced CMS functionality and system integrations, tailored to each client’s goals.',
      },
      {
        title: 'No-code platforms',
        description:
          'WordPress and Webflow where they fit best, ideal for campaign and content-driven sites.',
      },
      {
        title: 'Large-scale builds',
        description:
          'Thousands of pages, complex migrations, and highly technical data visualizations.',
      },
    ],
    detailsIntro:
      'With deep experience in the government and nonprofit sectors, we understand the critical importance of accessibility, security, and compliance. Every site we build is fully responsive and designed to perform seamlessly across devices and platforms.',
    details: [
      {
        title: 'Accessibility',
        description: 'Built to work for everyone who uses the site.',
      },
      {
        title: 'Security',
        description: 'Deep experience in the government and nonprofit sectors.',
      },
      {
        title: 'Compliance',
        description: 'Requirements understood and planned for from day one.',
      },
      {
        title: 'Fast and responsive',
        description:
          'Performance-focused technology that runs seamlessly across devices.',
      },
    ],
    platformsLabel: 'Platforms',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'build',
    },
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so you don’t have to',
    },
    workHeading: 'Web work',
  },
  'publication-design': {
    status: 'ready',
    title: 'Publication',
    highlight: 'design',
    overviewHeading: 'Publications that do the heavy lifting',
    overviewIntro:
      'THOR lives and breathes publication design. Our company was founded on publication development, and we continue to work with organizations to design and produce both print and digital publications.',
    overviewBody:
      'THOR often works with very small editorial teams. We help them punch above their weight by creating efficiencies in the production process and taking much of the creative development off their plate. This allows them to focus on their strengths: content writing and editing. Our systems simplify the exchange of information and content while keeping projects on schedule. We have a perfect record of delivering completed issue files to the printer on time and in excellent order.',
    platformsLabel: 'Services',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'publish',
    },
    platforms: [
      {
        title: 'Publication redesign',
        description:
          'Reimagine the visual system, content organization, and pacing of your publication.',
      },
      {
        title: 'Ongoing production',
        description:
          'Editorial design, cover illustrations, and infographics that help small teams deliver every issue.',
      },
      {
        title: 'Digital publishing',
        description:
          'Custom digital editions and CMS workflows that connect print and web.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so your team can focus on the story',
    },
    detailsIntro:
      'Our team understands the nuances of publication design, from organizing content and establishing a magazine’s pacing to preparing completed issue files for the printer.',
    details: [
      {
        title: 'Editorial systems',
        description:
          'Content organization and pacing shaped around your audience and subject matter.',
      },
      {
        title: 'Illustration and graphics',
        description:
          'Cover illustrations and clear infographics for complex topics.',
      },
      {
        title: 'Production planning',
        description:
          'Workflows that simplify content exchange and keep projects on schedule.',
      },
      {
        title: 'Print and digital',
        description:
          'Publishing systems that help a small editorial team work across formats.',
      },
    ],
    workHeading: 'Publication work',
  },
  'event-solutions': {
    status: 'ready',
    title: 'Event',
    highlight: 'solutions',
    overviewHeading: 'Events that run as well as they look',
    overviewIntro:
      'THOR builds the digital side of conferences, courses, and member gatherings: registration, schedules, speaker pages, and payments, all designed as one experience.',
    overviewBody:
      'We plan around the real attendee journey, from the first email to on-site check-in, and build on platforms your team can manage without us. Secure payments and clear flows keep registration quick for attendees and manageable for staff.',
    platformsLabel: 'Services',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'build',
    },
    platforms: [
      {
        title: 'Event sites',
        description:
          'Programs, speakers, venues, and sponsors presented clearly and on brand.',
      },
      {
        title: 'Registration and payments',
        description: 'Secure, simple checkout for tickets, courses, and dues.',
      },
      {
        title: 'Programs and content',
        description:
          'Schedules and session content that stay current as the event evolves.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so your event day runs smoothly',
    },
    detailsIntro:
      'Events depend on small things working every time. We test registration, payments, and communications end to end, so your team can focus on the people in the room.',
    details: [
      {
        title: 'Registration',
        description: 'Clear flows for every ticket type.',
      },
      {
        title: 'Payments',
        description: 'Secure, reliable checkout.',
      },
      {
        title: 'Schedules and speakers',
        description: 'Content that is easy to update.',
      },
      {
        title: 'Mobile-friendly',
        description: 'Built for attendees on the go.',
      },
    ],
    workHeading: 'Event work',
  },
  'e-commerce-solutions': {
    status: 'ready',
    title: 'E-commerce',
    highlight: 'solutions',
    overviewHeading: 'Storefronts built for demanding customers',
    overviewIntro:
      'THOR designs and builds e-commerce experiences that make buying simple: clear product storytelling, fast checkout, and secure payments.',
    overviewBody:
      'From regulated retail to association stores and dues, we integrate the platforms, payment gateways, and inventory systems your business relies on, then design the experience around how your customers actually shop.',
    platformsLabel: 'Services',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'sell',
    },
    platforms: [
      {
        title: 'Online stores',
        description: 'Product catalogs and checkout designed to convert.',
      },
      {
        title: 'Membership and dues',
        description: 'Recurring payments and gated access for associations.',
      },
      {
        title: 'Regulated retail',
        description: 'Compliance-aware storefronts for specialized retailers.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so every order goes through',
    },
    detailsIntro:
      'Checkout is where trust is won or lost. We design for speed and clarity, and build in the security and compliance that online payments demand.',
    details: [
      {
        title: 'Secure payments',
        description: 'Trusted gateways and PCI-conscious builds.',
      },
      {
        title: 'Fast checkout',
        description: 'Fewer steps from cart to confirmation.',
      },
      {
        title: 'Integrations',
        description: 'Inventory, fulfillment, and CRM connected.',
      },
      {
        title: 'Compliance',
        description: 'Requirements planned for from day one.',
      },
    ],
    workHeading: 'E-commerce work',
  },
  'mobile-apps': {
    status: 'ready',
    title: 'Mobile',
    highlight: 'apps',
    overviewHeading: 'Apps people actually keep using',
    overviewIntro:
      'THOR designs and builds mobile apps that put complex tools in people’s hands, with interfaces simple enough to use on the move.',
    overviewBody:
      'We work across iOS, Android, and the web, choosing the approach that fits your audience and budget. Discovery, UX architecture, design, and engineering happen together, so what we prototype is what ships.',
    platformsLabel: 'Platforms',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'build',
    },
    platforms: [
      {
        title: 'Native apps',
        description:
          'iOS and Android experiences that feel at home on each device.',
      },
      {
        title: 'Cross-platform apps',
        description: 'One codebase, consistent experience, faster delivery.',
      },
      {
        title: 'Web apps',
        description:
          'Installable, responsive tools that work wherever your audience is.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so your users never notice them',
    },
    detailsIntro:
      'A good app disappears into the task. We focus on usability, performance, and security, and we test on real devices with real users.',
    details: [
      {
        title: 'Usability',
        description: 'Simple flows tested with real users.',
      },
      {
        title: 'Performance',
        description: 'Fast launch and smooth interaction.',
      },
      {
        title: 'Accessibility',
        description: 'Designed for every user and ability.',
      },
      {
        title: 'Security',
        description: 'Data protected on device and in transit.',
      },
    ],
    workHeading: 'Mobile work',
  },
  'data-visualization': {
    status: 'ready',
    title: 'Data',
    highlight: 'visualization',
    overviewHeading: 'Data that tells a story',
    overviewIntro:
      'THOR turns large, complicated datasets into interactive experiences people can explore and understand, from rankings and maps to dashboards and reports.',
    overviewBody:
      'We design the whole path from raw data to finished story: structuring the data, choosing the right visual forms, and building fast, accessible interactions on the web. Our work for City Ratings covers thousands of cities worldwide.',
    platformsLabel: 'Formats',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'visualize',
    },
    platforms: [
      {
        title: 'Rankings and scorecards',
        description: 'Clear comparisons that make complex scores easy to read.',
      },
      {
        title: 'Maps and exploration',
        description:
          'Interactive views that let audiences find their own answers.',
      },
      {
        title: 'Dashboards and reports',
        description: 'Live data presented for decisions, not decoration.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so the data speaks clearly',
    },
    detailsIntro:
      'Good visualization is accurate first, then beautiful. We pair data discipline with design craft so every chart, map, and table is honest and easy to use.',
    details: [
      {
        title: 'Clarity',
        description: 'The right visual form for every dataset.',
      },
      {
        title: 'Accuracy',
        description: 'Data handled and presented with care.',
      },
      {
        title: 'Accessibility',
        description: 'Charts everyone can read and use.',
      },
      {
        title: 'Performance',
        description: 'Fast even with large datasets.',
      },
    ],
    workHeading: 'Data work',
  },
  'user-experience': {
    status: 'ready',
    title: 'User',
    highlight: 'experience',
    overviewHeading: 'Architecture that makes sense of complexity',
    overviewIntro:
      'THOR’s UX practice defines the structure beneath every site and app: who it’s for, what they need, and how everything fits together.',
    overviewBody:
      'We start with discovery, including stakeholder interviews, audience research, and analytics audits, then move to sitemaps, content models, and templates your team can maintain. Design and development inherit a clear blueprint.',
    platformsLabel: 'Approach',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'help',
    },
    platforms: [
      {
        title: 'Discovery',
        description:
          'Stakeholder interviews, audience research, and analytics audits.',
      },
      {
        title: 'Architecture',
        description:
          'Sitemaps, templates, and a content model staff can maintain.',
      },
      {
        title: 'Testing and refinement',
        description:
          'Prototypes and usability testing that sharpen the design before launch.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so your audience doesn’t have to',
    },
    detailsIntro:
      'The best experiences feel obvious. We obsess over structure, labels, and flows so visitors find what they need without thinking about it.',
    details: [
      {
        title: 'Research',
        description: 'Decisions grounded in audience insight.',
      },
      {
        title: 'Information architecture',
        description: 'Structure that matches how people think.',
      },
      {
        title: 'Content models',
        description: 'Systems your team can maintain.',
      },
      {
        title: 'Usability',
        description: 'Flows tested before they are built.',
      },
    ],
    workHeading: 'UX work',
  },
  branding: {
    status: 'ready',
    title: 'Memorable',
    highlight: 'branding',
    overviewHeading: 'Identity systems built to last',
    overviewIntro:
      'THOR builds brands for organizations that need to be remembered, from positioning to visual identity systems that scale across print, web, and product.',
    overviewBody:
      'Our rebrand for NIRI created a modern, scalable system, and we’ve maintained it as a long-term partner for years since. We design flexible systems of logos, color, type, and motion, along with the guidelines that help every team use them well.',
    platformsLabel: 'Services',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'brand',
    },
    platforms: [
      {
        title: 'Organizational rebranding',
        description:
          'Clarifying who you are and expressing it with confidence.',
      },
      {
        title: 'Visual identity systems',
        description:
          'Logos, color, type, and motion that work together everywhere.',
      },
      {
        title: 'Brand and design systems',
        description: 'Guidelines and components that keep every team on brand.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so your brand holds together',
    },
    detailsIntro:
      'A brand is only as strong as its consistency. We build the guidelines, templates, and tools that keep it coherent across every channel and every year.',
    details: [
      {
        title: 'Positioning',
        description: 'A clear idea at the center of the brand.',
      },
      {
        title: 'Visual identity',
        description: 'Distinctive, flexible, and ownable.',
      },
      {
        title: 'Guidelines',
        description: 'Practical rules teams actually follow.',
      },
      {
        title: 'Rollout',
        description: 'Launch plans across print, web, and product.',
      },
    ],
    workHeading: 'Brand work',
  },
  'content-strategy': {
    status: 'ready',
    title: 'Content',
    highlight: 'strategy',
    overviewHeading: 'Content that earns its place',
    overviewIntro:
      'THOR helps organizations decide what to say, to whom, and where it lives: audits, messaging, editorial planning, and the content models behind the site.',
    overviewBody:
      'We work with subject-matter experts to make dense, technical material accessible, and we set up the structure and workflows so your staff can keep it fresh long after launch.',
    platformsLabel: 'Services',
    platformsHeading: {
      text: 'Three ways we',
      highlight: 'help',
    },
    platforms: [
      {
        title: 'Content audits',
        description:
          'A clear picture of what you have, what works, and what to retire.',
      },
      {
        title: 'Messaging and voice',
        description:
          'Language that sounds like you and speaks to each audience.',
      },
      {
        title: 'Editorial systems',
        description: 'Models, workflows, and calendars your team can sustain.',
      },
    ],
    detailsHeading: {
      text: 'We focus on the',
      highlight: 'details',
      after: 'so your content stays useful',
    },
    detailsIntro:
      'Content ages quickly without a plan. We define ownership, structure, and review cycles so your site stays accurate and easy to manage.',
    details: [
      {
        title: 'Clarity',
        description: 'Plain language for complex subjects.',
      },
      {
        title: 'Findability',
        description: 'Structure and search that surface the right answer.',
      },
      {
        title: 'Governance',
        description: 'Clear ownership and review cycles.',
      },
      {
        title: 'Accessibility',
        description: 'Content everyone can read and use.',
      },
    ],
    workHeading: 'Content work',
  },
} satisfies Record<string, CapabilityPageContent>;
