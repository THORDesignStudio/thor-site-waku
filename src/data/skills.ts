// Skills on homepage

interface Skill {
  name: string;
  description: string;
  url: string;
  skills: string[];
  backgroundColor: string;
}

interface Skills {
  title: string;
  skills: Skill[];
}

export const skills: Skills = {
  title: 'Skills',
  skills: [
    {
      name: 'Discovery',
      description:
        'Listening to our clients and building architecture around their needs underpins all our work.',
      url: '/skills/architecture',
      skills: [
        'User Research',
        'User Interviews',
        'User Testing',
        'Information Architecture',
      ],
      backgroundColor: 'var(--color-night)',
    },
    {
      name: 'Design',
      description:
        'Designing bespoke experiences for our clientele delivers engagement for their brands.',
      url: '/skills/ui-ux-design',
      skills: ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator'],
      backgroundColor: 'var(--color-gray-blue)',
    },
    {
      name: 'Development',
      description:
        'Building solutions tailored for our clients that prioritize speed and reliability.',
      skills: ['React', 'Next.js', 'Astro', 'WordPress'],
      url: '/skills/web-development',
      backgroundColor: 'var(--color-spicy-purple)',
    },
    {
      name: 'Project Management',
      description:
        'Organizing the specific tasks of each project results in continuous, timely deliveries.',
      skills: [
        'Kanban Task Management',
        'Estimation',
        'Communication',
        'Project Planning',
      ],
      url: '/skills/project-management',
      backgroundColor: 'var(--color-pink-flat)',
    },
  ],
};
