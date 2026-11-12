// Menus for the site

interface MenuLink {
  name: string;
  url: string;
}

interface MenuSection {
  title: string;
  url?: string;
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
          name: 'About \/ Team',
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
      title: 'How We Work',
      url: '/how-we-work',
      links: [
        {
          name: 'How We Build for the Web',
          url: '/how-we-work#hww-web',
        },
        {
          name: 'How We Design Publications',
          url: '/how-we-work#hww-pubs',
        },
        {
          name: 'How We Guide Our Clients',
          url: '/how-we-work#hww-guide',
        },
      ],
    },
    {
      title: 'Where We Work',
      links: [
        {
          name: 'Associations & Non-Profits',
          url: '/verticals/associations-nonprofits',
        },
        {
          name: 'Construction & Engineering',
          url: '/verticals/construction-engineering',
        },
        {
          name: 'Publications',
          url: '/verticals/publications',
        },
      ],
    },
  ],
};
