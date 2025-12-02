// Menus for the site

interface MenuLink {
  name: string;
  url: string;
}

interface MenuSection {
  title: string;
  links: MenuLink[];
}

interface FooterMenu {
  title: string;
  sections: MenuSection[];
}

export const footerMenu: FooterMenu = {
  title: 'Footer Menu',
  sections: [
    {
      title: 'What',
      links: [
        {
          name: 'Home',
          url: '/',
        },
        {
          name: 'Team',
          url: '/team',
        },
        {
          name: 'About',
          url: '/about',
        },
        {
          name: 'Capabilities',
          url: '/capabilities',
        },
        {
          name: 'Case Studies',
          url: '/case-studies',
        },
      ],
    },
    {
      title: 'How',
      links: [
        {
          name: 'Discovery',
          url: '/writing/discovery',
        },
        {
          name: 'Architecture',
          url: '/writing/architecture',
        },
        {
          name: 'Design',
          url: '/writing/design',
        },
        {
          name: 'Development',
          url: '/writing/development',
        },
        {
          name: 'Project Management',
          url: '/writing/project-management',
        },
      ],
    },
    {
      title: 'Where',
      links: [
        {
          name: 'Associations',
          url: '/verticals/associations',
        },
        {
          name: 'Engineering',
          url: '/verticals/engineering',
        },
        {
          name: 'Outdoor',
          url: '/verticals/outdoor',
        },
      ],
    },
  ],
};
