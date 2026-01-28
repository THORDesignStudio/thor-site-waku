interface Capability {
  name: string;
  dek: string;
  description: string;
  url: string;
  image: string;
  backgroundColor: string;
}

interface Capabilities {
  title: string;
  capabilities: Capability[];
}

export const capabilities: Capabilities = {
  title: 'Capabilities',
  capabilities: [
    {
      name: 'Digital Transformation',
      dek: 'Build a bridge to where you want to be.',
      description:
        "If your organization is struggling with outdated thinking, it can cloud your entire company's vision. Our ability to transform your digital operations with design and technology solutions will reposition your firm as a leader.",
      url: '/capabilities/digital-transformation',
      image: '/images/capabilities/01-bridge-digital-transformation.png',
      backgroundColor: 'var(--color-night)',
    },
    {
      name: 'Greenfield Projects',
      dek: 'Plant your flag in what is to come.',
      description:
        "Ideas are a brand's currency. But your customers want services that deliver value. THOR turns your visions into reality. We take data and design direction from your team and build them into solutions that delight your users.",
      url: '/capabilities/greenfield-projects',
      image: '/images/capabilities/02-flag-greenfield-projects.png',
      backgroundColor: 'var(--color-gray-blue)',
    },
    {
      name: 'Rebranding Organizations',
      dek: 'Lay a new foundation for your ambitions.',
      description:
        'Your digital presence is the first impression customers have of you. Getting it wrong can tarnish your brand. We analyze where your brand misses customers and validate a new approach with data. Relaunch to eager audiences.',
      url: '/capabilities/rebranding',
      image: '/images/capabilities/05-cube-org-rebranding.png',
      backgroundColor: 'var(--color-spicy-purple)',
    },
    {
      name: 'Technology Consulting',
      dek: "Light the way to what's next.",
      description:
        'Legacy systems and dated design hurt your brand every day. Our consulting services deliver clarity. We will identify which systems hold your vision back, and which can accelerate your mission. Your organization will be trained for the next chapter of success.',
      url: '/capabilities/consulting',
      image: '/images/capabilities/03-flashlight-tech-consultation.png',
      backgroundColor: 'var(--color-pink-flat)',
    },
    {
      name: 'Interactive Design',
      dek: 'Make a space as big as your vision.',
      description:
        'Tired designs communicate a lack of vision. THOR can infuse a new world of creativity into your mission with data from your operations. We close the gap between your brand and your customers with an aesthetic all your own.',
      url: '/capabilities/interactive-design',
      image: '/images/capabilities/04-satellite-interactive-design.png',
      backgroundColor: 'var(--color-gray-blue)',
    },
  ],
};
