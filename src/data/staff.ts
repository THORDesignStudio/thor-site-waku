export interface Staff {
  name: string;
  role: string;
  image: string;
  bio: string;
  featured: boolean;
  imagePosition: string | null;
}

interface StaffList {
  title: string;
  staff: Staff[];
}

export const staff: StaffList[] = [
  {
    title: 'Staff',
    staff: [
      {
        name: 'Colby Waller',
        role: 'Principal - Design',
        image: '/images/staff/colby.png',
        bio: "Colby drives the creative vision at THOR, bringing 20+ years of experience blending print and digital media into bold, strategic work. He's a pro at turning ideas into visually striking, effective designs and previously shared his expertise teaching publication design at Boston University's Washington D.C. satellite campus. Colby holds an MA in New Media Photojournalism from the Corcoran College of Art and Design and a BA in Advertising from Marquette University. Off the clock, he's a top-level mountain bike racer, outdoor adventurer, and music lover. His curiosity and storytelling spirit fuel the energy behind every THOR project.",
        featured: true,
        imagePosition: 'right',
      },
      {
        name: 'John Serrao',
        role: 'Principal - Technology',
        image: '/images/staff/john.png',
        bio: 'John leads the technical vision at THOR, bringing decades of experience in web development, digital strategy, and technical architecture. He bridges the gap between creative vision and technical implementation, ensuring every project is built on solid foundations with cutting-edge technology.',
        featured: true,
        imagePosition: 'right',
      },
      {
        name: 'Colin OBrien',
        role: 'Lead Developer - WordPress',
        image: '/images/staff/colin.jpg',
        bio: "Colin O'Brien is a full-stack web developer with expertise in modern JavaScript frameworks, WordPress theme and plugin development, and cloud infrastructure. He brings a pragmatic, detail-oriented approach to every project, with a focus on intuitive user experiences and custom publishing workflows. Colin has particular strengths in performance optimization and building maintainable systems at scale for clients in the digital publishing, nonprofit, and travel spaces. When he's not writing code, he's probably exploring back roads or making electronic music.",
        featured: false,
        imagePosition: null,
      },
      {
        name: 'Maria Beam',
        role: 'Lead Design - User Experience',
        image: '/images/staff/maria.jpg',
        bio: "Maria is a four-time award-winning designer and published artist specializing in branding, web, product, and UX design. Her work spans the travel, technology, and outdoor industries, with a background that includes both agency leadership and scaling design for high-growth startups that have secured over $297 million in funding. Her UX contributions power many of today's leading direct booking platforms. She recently returned to agency work to focus on high-touch brand strategy and user experience.",
        featured: false,
        imagePosition: null,
      },
      {
        name: 'Rob Roberts',
        role: 'Content Strategist & Project Manager',
        image: '/images/staff/rob.jpg',
        bio: 'Rob Roberts has been working in digital media for over 20 years in a career that has spanned, government, journalism, advocacy and academics. Currently, he works as a creative and digital consultant working with organizations to better align their digital presence with their communications goals. Rob worked for several years in the Obama Administration, first in the White House Office of Digital Services and later as Director of Digital Strategy at the U.S. Department of Energy. Rob has taught audio and video production, digital strategy and writing for communications as an adjunct professor at American University since 2009.',
        featured: false,
        imagePosition: null,
      },
      {
        name: 'Smitty "Jeff" Smith',
        role: 'Lead Designer - Branding',
        image: '/images/staff/smitty.jpg',
        bio: 'Smitty is a lead designer for THOR Digital, blending years of brand development experience with a sharp creative eye. He crafts cohesive, compelling visual identities and design systems that communicate client stories effectively across digital and print platforms.',
        featured: false,
        imagePosition: null,
      },
      {
        name: 'Angela Mitchell',
        role: 'Lead Designer - Publications',
        image: '/images/staff/ang.jpg',
        bio: 'Ang is a lead designer for THOR Digital, with a keen eye for detail and expertise in publication and complex design projects. She excels at turning intricate content into polished, visually compelling layouts while maintaining consistency and clarity across all materials.',
        featured: false,
        imagePosition: null,
      },
      {
        name: 'Yousef Ahmad',
        role: 'Lead Developer - Mobile',
        image: '/images/staff/yousef.jpg',
        bio: "Yousef Ahmad builds digital products that actually move people — not just impress them. As the founder of Breek Labs, a design-led studio based in Virginia, he's spent his career at the intersection of strategic design and emerging technology, helping healthcare organizations, law firms, and forward-thinking companies ship experiences worth talking about. His work spans the full arc of product development — from early-stage UX thinking to production-ready mobile and web apps — with a sharp focus on making complex systems feel effortless to use. Yousef has led app development for clients including the American Gastroenterological Association, where his team delivered patient-facing tools that blend clinical precision with consumer-grade design.",
        featured: false,
        imagePosition: null,
      },
    ],
  },
];
