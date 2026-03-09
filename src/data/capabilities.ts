export interface Capability {
  name: string;
  slug: string;
  short: string;
  dek: string;
  url: string;
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
      name: 'Web Development',
      slug: 'web-development',
      short: 'Website',
      dek: 'Developing websites that are fast and easy to use.',
      url: '/capabilities/web-development',
      backgroundColor: '#F3F4F6',
    },
    {
      name: 'Graphic Design',
      slug: 'graphic-design',
      short: 'Design',
      dek: 'Creating unique designs that tell your brand story.',
      url: '/capabilities/graphic-design',
      backgroundColor: '#E5E7EB',
    },
    {
      name: 'Publication Design',
      slug: 'publication-design',
      short: 'Publication',
      dek: 'Orchestrating world-class print and digital publication.',
      url: '/capabilities/publication-design',
      backgroundColor: '#E5E7EB',
    },
    {
      name: 'Event Registration',
      slug: 'event-registration',
      short: 'Event',
      dek: 'Bringing together thought leaders with design and seamless payments.',
      url: '/capabilities/event-registration',
      backgroundColor: '#F3F4F6',
    },
    {
      name: 'E-Commerce',
      slug: 'e-commerce',
      short: 'Checkout',
      dek: 'Secure payments and fast checkout experiences for demanding customers.',
      url: '/capabilities/e-commerce',
      backgroundColor: '#E5E7EB',
    },
    {
      name: 'Mobile Apps',
      slug: 'mobile-apps',
      short: 'Mobile App',
      dek: 'Delivering intuitive mobile experiences across all platforms.',
      url: '/capabilities/mobile-apps',
      backgroundColor: '#D1D5DB',
    },
    {
      name: 'Data Visualization',
      slug: 'data-visualization',
      short: 'Data Visualization',
      dek: 'Weaving complex data into engaging visual narratives.',
      url: '/capabilities/data-visualization',
      backgroundColor: '#F3F4F6',
    },
    {
      name: 'User Experience Design',
      slug: 'user-experience-design',
      short: 'User Experience',
      dek: 'Foundational architecture for intuitive digital experiences.',
      url: '/capabilities/user-experience-design',
      backgroundColor: '#E5E7EB',
    },
    {
      name: 'Discovery Interviews',
      slug: 'discovery-interviews',
      short: 'Organization',
      dek: 'Giving organizations an outside look at their internal operations.',
      url: '/capabilities/discovery-interviews',
      backgroundColor: '#D1D5DB',
    },
  ],
};

// Export lookup utilities
export const getCapabilityBySlug = (slug: string): Capability | undefined =>
  capabilities.capabilities.find((c) => c.slug === slug);

export const getCapabilityByUrl = (url: string): Capability | undefined =>
  capabilities.capabilities.find((c) => c.url === url);

export const getCapabilityByName = (name: string): Capability | undefined =>
  capabilities.capabilities.find((c) => c.name === name);
