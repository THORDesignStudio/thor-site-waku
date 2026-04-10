export interface Capability {
  name: string;
  slug: string;
  short: string;
  dek: string;
  description: string;
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
      description: `THOR Digital builds high-performance websites that combine strong visual design with exceptional usability. With clients across a wide range of industries, every project we undertake is unique, and we pride ourselves on developing custom solutions tailored to each client's goals. Because of this, our work spans a wide range of platforms and levels of complexity, ranging from fully custom websites with advanced CMS functionality and system integrations to no-code platforms like WordPress and Webflow that are ideal for campaign and content-driven sites. We regularly manage large-scale projects involving thousands of pages, complex migrations, and highly technical data visualizations.\n\nOur agile development process keeps projects moving efficiently from concept to launch. Through iterative sprints, we collaborate closely with our clients at every stage, maintaining clarity, momentum, and alignment throughout the project lifecycle. We're always pushing boundaries and staying ahead of the rapid pace of technology. Our developers use performance-focused technologies and best practices to ensure reliability and lightning-fast load times.\n\nWe worry about the details so you don't have to. With deep experience in the government and nonprofit sectors, we understand the critical importance of accessibility, security, and compliance. Every site we build is fully responsive and designed to perform seamlessly across devices and platforms.\n\nAt THOR, you work with a team of seasoned professionals with decades of combined experience. We bring together discovery, UX architecture, design, technical project management, and engineering in a collaborative workflow that produces durable digital platforms built to evolve with our clients' needs.\n\nVisit our web development case studies to learn more about our work.`,
      url: '/capabilities/web-development',
      backgroundColor: '#F3F4F6',
    },
    {
      name: 'Publication Design',
      slug: 'publication-design',
      short: 'Publication',
      dek: 'Orchestrating world-class print and digital publication.',
      description: `THOR lives and breathes publication design. Our company was founded on publication development, and while we have pivoted in large part to digital projects, we continue to work with numerous organizations to design and produce both print and digital publications. Our team has designed and redesigned dozens of award-winning magazines and produced thousands of individual issues across many professional sectors, including aerospace, engineering, higher education, finance, pharmaceuticals, forensic science, and more. Our work has received numerous awards from the publishing and small business communities over the past decade. We are known for our high level of creativity, our skill in developing cover illustrations and complex infographics, and our strong level of personal engagement. Most of our magazine clients have worked with us for well over a decade—a testament to our commitment to their publications.\n\nTHOR often works with very small editorial teams. We help them punch above their weight by creating efficiencies in the production process and taking much of the creative development off their plate. This allows them to focus on their strengths: content writing and editing. Our systems simplify the exchange of information and content while keeping projects on schedule. We have a perfect record of delivering completed issue files to the printer on time and in excellent order.\n\nAs part of our publication work, we have redesigned nearly every title we've taken on. We have a proven method for guiding editorial teams and their stakeholders through the process of reimagining their publication. This work involves the magazine aesthetics where we have a natural ability to develop designs that match the tone of the subject matter and audience. It also involves organizing content and establishing the pacing of the magazine. This is a far more complex discipline, and one that takes years to master. Our team understands the nuances of publication design and can assess and improve your publication at every level.\n\nTHOR has also guided numerous publications through the transition from print to digital formats. We model our online publications on world-class examples such as The New York Times. While organizations like the Times have thousands of employees, our clients often work with only a handful of editors. We create CMS systems that unify print and digital workflows, allowing editorial teams to publish efficiently across platforms. These sites are designed with automated content organization systems and best practices for long-form reading.\n\nVisit our digital publication case studies to learn more about our work, and explore our publications landing page to see an archive of projects we've produced over the years.`,
      url: '/capabilities/publication-design',
      backgroundColor: '#E5E7EB',
    },
    {
      name: 'Event Solutions',
      slug: 'event-solutions',
      short: 'Event',
      dek: 'Bringing together thought leaders with design and seamless payments.',
      description: `In-person events are pivotal touchpoints between organizations and their audiences. Attendees have high expectations, not only for the content presented during these events but also for the surrounding experience, from the online registration platform to the environment itself. THOR can provide both the digital and physical components of a successful event.\n\nTHOR produces a wide range of event assets, including conference websites, promotional campaigns, environmental graphics, presentation templates, and wayfinding systems. These elements work together to guide attendees through event spaces while reinforcing the event's narrative. Because events operate under tight timelines, strong coordination and production management are essential. Our team works closely with organizers and vendors to ensure that all materials are delivered accurately and on schedule.\n\nCreating an online portal for event promotion, registration, and engagement cannot be left to chance. A frictionless experience that generates interest and converts visitors into registered attendees is critical. THOR Digital creates integrated systems that guide audiences through the registration process. We have extensive experience integrating with key platforms such as Salesforce, Stripe, and HubSpot, along with other tools that work together to support a complete CRM ecosystem.\n\nVisit our event solutions case studies to learn more about our work.`,
      url: '/capabilities/event-registration',
      backgroundColor: '#F3F4F6',
    },
    {
      name: 'E-Commerce Solutions',
      slug: 'e-commerce-solutions',
      short: 'Checkout',
      dek: 'Secure payments and fast checkout experiences for demanding customers.',
      description: `Online purchases have become so commonplace that the bulk of our transactions now involve some level of digital process. Users have become accustomed to rapidly and securely making purchases and any process that has glitches or unnecessary steps is viewed with scrutiny and often results in missed sales opportunities. THOR Digital builds e-commerce platforms that make online purchasing seamless, secure, and user-friendly. Our goal is to create shopping experiences that are virtually invisible to the users and that guide customers effortlessly from discovery to checkout while safeguarding sensitive data.\n\nOur designs emphasize compelling product presentation with streamlined checkout flows, including simplified carts, guest checkout, and minimal form fields, to reduce friction and boost conversions. Technically, we integrate leading systems like Salesforce, Stripe, and other CRM and analytics platforms, enabling centralized data management, secure transactions, and scalable operations.\n\nSecurity is central to every platform. We implement encrypted transactions, secure payment processing, and compliance with industry standards to protect customer and payment data. By blending thoughtful design with robust technology, THOR delivers e-commerce solutions that ensure smooth, safe, and satisfying shopping experiences.\n\nVisit our e-commerce case studies to learn more about our work.`,
      url: '/capabilities/e-commerce',
      backgroundColor: '#E5E7EB',
    },
    {
      name: 'Mobile Apps',
      slug: 'mobile-apps',
      short: 'Mobile App',
      dek: 'Delivering intuitive mobile experiences across all platforms.',
      description: `THOR Digital develops applications that transform complex processes into easy-to-use tools. Much of our work has focused on the healthcare sector, where we have built rapid assessment tools that physicians use in clinical settings to identify and evaluate serious medical conditions. These applications provide critical information and help guide clinicians toward the first steps in patient treatment.\n\nBecause these tools are used in time-sensitive environments, our work emphasizes speed, efficiency, and the precise communication of complex medical information. Designing for clinicians with limited time and high-stakes decision-making has shaped our approach to application development and those same principles translate seamlessly to any app project. Our mobile solutions prioritize clarity, performance, and usability, ensuring users can quickly access the information they need.\n\nEvery project begins with discovery and workflow analysis to understand user behavior and operational requirements. These insights inform the development of user journeys and interaction models that simplify complex processes into logical steps.\n\nOur design approach emphasizes touch-optimized interfaces, strong visual hierarchy, and streamlined navigation. Our overarching goal is to reduce cognitive load while enabling users to complete tasks quickly and confidently in real-world environments.\n\nFrom a technical perspective, THOR builds scalable applications that integrate securely with external systems and APIs. Prototyping and testing occur throughout development, allowing functionality and usability to be refined continuously before launch.\n\nVisit our mobile app case studies to learn more about our work.`,
      url: '/capabilities/mobile-apps',
      backgroundColor: '#D1D5DB',
    },
    {
      name: 'Data Visualization',
      slug: 'data-visualization',
      short: 'Data Visualization',
      dek: 'Weaving complex data into engaging visual narratives.',
      description: `Modern websites have evolved far beyond static collections of text. Today they are dynamic communication platforms that use visuals to tell stories. THOR Digital loves this type of work. We've helped numerous clients translate complex datasets into compelling visual narratives. Creating this kind of work requires a specialized team that combines analytical thinking, systems engineering, and thoughtful visual design. THOR has assembled that precise group of individuals.\n\nWe take on data visualization projects of all sizes. Our work in the aerospace industry has largely focused on in-depth, single-page explanations of specific topics, including the Artemis moon mission, SpaceX's plans for Mars, rocket pioneer Goddard's legacy, and the science behind supersonic air travel. In the outdoor industry, our work has focused on much larger-scale visualizations. For the PeopleForBikes City Ratings project, we transformed a large and complex dataset into a highly visual ranking system consisting of thousands of individual pages of results.\n\nData visualization is both a science and an art. Our development team has the technical expertise to work closely with client datasets and shape them into usable structures. We begin each project by analyzing the structure and meaning of the available data. Working with our clients, we identify the key relationships and messages that should be communicated visually, then move forward with bringing that vision to life.\n\nOur design team brings a strong eye for aesthetics and clarity. We apply proven information design principles to build clear visual hierarchies using charts, maps, dashboards, and interactive modules.\n\nIf your organization maintains large datasets, let us help bring them to life for your audience. The numbers tell a story and our team can help tell it.\n\nVisit our data visualization case studies to learn more about our work.`,
      url: '/capabilities/data-visualization',
      backgroundColor: '#F3F4F6',
    },
    {
      name: 'User Experience',
      slug: 'user-experience',
      short: 'User Experience',
      dek: 'Foundational architecture for intuitive digital experiences.',
      description: `With our society collectively spending much of the day tethered to devices and online experiences, user experience has become an essential component of any communications effort. Users share a broad set of expectations and habits that shape the patterns designers must consider. Friction and frustration must be avoided in digital environments, and an aesthetic that creates a strong first impression is crucial to success regardless of a site's purpose. THOR Digital creates user experiences that transform complex information into intuitive digital systems. Our UX process combines research, information architecture, and iterative design to ensure platforms are both effective and easy to use.\n\nLed by UX Strategist Maria Beam, THOR's experience design practice balances creativity with functionality, guiding users seamlessly to the information and actions they need.\n\nThe process begins with discovery and audience analysis to understand how users interact with content and technology. These insights guide the creation of user journeys, navigation structures, and content hierarchies. We also perform in-depth content audits, which often reveal valuable insights. Many clients have never had a third party analyze their content and audience with fresh eyes. THOR is able to provide clear, highly organized new perspectives on their content and reshape it into systems that organize large volumes of material into structures that are easy to navigate and designed to expand over time.\n\nOur UX team develops wireframes and interactive prototypes using Figma. We have extensive expertise with this platform and leverage it fully throughout the UX, design, and development phases of a project. Figma is particularly effective for enabling stakeholders to collaborate on design systems and evaluate usability early in the process. Through iterative testing and refinement, we continuously improve usability throughout development. This agile approach allows user feedback and real-world insights to shape the final product.\n\nVisit our user experience case studies to learn more about our work.`,
      url: '/capabilities/user-experience',
      backgroundColor: '#E5E7EB',
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
