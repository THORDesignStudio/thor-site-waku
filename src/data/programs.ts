export interface Program {
  name: string;
  slug: string;
  dek: string;
  description: string;
  url: string;
  image: string;
  backgroundColor: string;
}

interface Programs {
  title: string;
  programs: Program[];
}

export const programs: Programs = {
  title: 'Programs',
  programs: [
    {
      name: 'Digital Transformation',
      slug: 'digital-transformation',
      dek: 'Build a bridge to where you want to be.',
      description:
        "If your organization is struggling with outdated thinking, it can cloud your entire company's vision. Our ability to transform your digital operations with design and technology solutions will reposition your firm as a leader.",
      url: '/programs/digital-transformation',
      image: '/images/programs/01-bridge-digital-transformation.png',
      backgroundColor: 'var(--color-night)',
    },
    {
      name: 'Greenfield Projects',
      slug: 'greenfield-projects',
      dek: 'Plant your flag in what is to come.',
      description:
        "Ideas are a brand's currency. But your customers want services that deliver value. THOR turns your visions into reality. We take data and design direction from your team and build them into solutions that delight your users.",
      url: '/programs/greenfield-projects',
      image: '/images/programs/02-flag-greenfield-projects.png',
      backgroundColor: 'var(--color-gray-blue)',
    },
    {
      name: 'Organizational Rebranding',
      slug: 'organizational-rebranding',
      dek: 'Lay a new foundation for your ambitions.',
      description:
        'Your digital presence is the first impression customers have of you. Getting it wrong can tarnish your brand. We analyze where your brand misses customers and validate a new approach with data. Relaunch to eager audiences.',
      url: '/programs/rebranding',
      image: '/images/programs/05-cube-org-rebranding.png',
      backgroundColor: 'var(--color-spicy-purple)',
    },
    {
      name: 'Technology Consulting',
      slug: 'technology-consulting',
      dek: "Light the way to what's next.",
      description:
        'Legacy systems hurt your brand every day. Our consulting services deliver clarity. We will identify which systems hold your vision back, and which can accelerate your mission. Your organization will be trained for the next chapter of success.',
      url: '/programs/consulting',
      image: '/images/programs/03-flashlight-tech-consultation.png',
      backgroundColor: 'var(--color-pink-flat)',
    },
    {
      name: 'Interactive Campaigns',
      slug: 'interactive-campaigns',
      dek: 'Make a space as big as your vision.',
      description:
        'Tired designs communicate a lack of vision. THOR can infuse a new world of creativity into your mission with engaging campaigns. We experiment with new aesthetics that close the gap between your dreams and your customers.',
      url: '/programs/interactive-campaigns',
      image: '/images/programs/04-satellite-interactive-design.png',
      backgroundColor: 'var(--color-gray-blue)',
    },
  ],
};

// Export lookup utilities
export const getProgramBySlug = (slug: string): Program | undefined =>
  programs.programs.find((p) => p.slug === slug);

export const getProgramByUrl = (url: string): Program | undefined =>
  programs.programs.find((p) => p.url === url);

export const getProgramByName = (name: string): Program | undefined =>
  programs.programs.find((p) => p.name === name);
