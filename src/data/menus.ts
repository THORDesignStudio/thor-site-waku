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
      ],
    },
    {
      title: 'How',
      links: [
        {
          name: 'Capabilities',
          url: '/capabilities',
        },
        {
          name: 'Programs',
          url: '/programs',
        },
        {
          name: 'Case Studies',
          url: '/case-studies',
        },
      ],
    },
    {
      title: 'Where',
      links: [
        {
          name: 'Associations & Non-Profits',
          url: '/verticals/associations-non-profits',
        },
        {
          name: 'Construction & Engineering',
          url: '/verticals/construction-engineering',
        },
        {
          name: 'Health Care',
          url: '/verticals/health-care',
        },
        {
          name: 'Media',
          url: '/verticals/media',
        },
        {
          name: 'Outdoor',
          url: '/verticals/outdoor',
        },
      ],
    },
  ],
};
