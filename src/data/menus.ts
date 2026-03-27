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
      title: 'Explore Our Firm',
      links: [
        {
          name: 'Home',
          url: '/',
        },
        {
          name: 'About',
          url: '/about',
        },
        {
          name: 'Team',
          url: '#',
        },
      ],
    },
    {
      title: 'How We Work',
      links: [
        {
          name: 'Capabilities',
          url: '#',
        },
        {
          name: 'Programs',
          url: '#',
        },
        {
          name: 'Case Studies',
          url: '#',
        },
      ],
    },
    {
      title: 'Where We Work',
      links: [
        {
          name: 'Associations & Non-Profits',
          url: '#',
        },
        {
          name: 'Construction & Engineering',
          url: '#',
        },
        {
          name: 'Health Care',
          url: '#',
        },
        {
          name: 'Media',
          url: '#',
        },
        {
          name: 'Outdoor',
          url: '#',
        },
      ],
    },
  ],
};
