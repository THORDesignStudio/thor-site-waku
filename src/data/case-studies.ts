export interface CaseStudy {
  name: string;
  slug: string;
  dek: string;
  projectBrief: string;
  mainText: string;
  achievements: string[];
  verticals: string[];
  categories: string[];
  client: string;
  url: string;
  images: {
    cardHorizontal: string;
    header: {
      png: string;
      webp: string;
    };
    project: {
      png: string;
      webp: string;
    };
  };
}

interface CaseStudies {
  title: string;
  caseStudies: CaseStudy[];
}

export const caseStudies: CaseStudies = {
  title: 'Case Studies',
  caseStudies: [
    {
      name: 'IBD Drug Guide',
      slug: 'ibd-drug-guide',
      dek: 'A healthcare web application and clinical decision-support tool for physicians and patients battling IBD',
      projectBrief:
        "THOR Digital partnered with Knighten Health and the American Gastroenterological Association (AGA) to develop the IBD Drug Guide. The main goal of the project was to simplify treatment decision-making for patients with IBD (Inflammatory Bowel Disease) conditions like Ulcerative Colitis and Crohn's Disease.\n\nThis guide displays the full breadth of treatment options currently available but also uses an interactive Q&A funnel that walks users through the key treatment decision points. A complex pharmaceutical database becomes a personalized, quiz-driven experience for the user. This empowers patients to understand their treatment options while the research community gains insight into disease prevalence.",
      mainText:
        "Selecting the right medication for IBD can be overwhelming. Patients have to navigate a complex landscape of treatment options with new options like biosimilars. To address this challenge, THOR Digital partnered with Knighten Health to develop the IBD Drug Guide. The platform translates complex medical data into a clear, personalized experience for both patients and healthcare professionals.\n\nAt the heart of the platform is an interactive quiz that guides users through a series of personalized questions. The system uses intelligent logic to customize treatment recommendations that are tailored to each user's unique situation.\n\nTHOR focused heavily on user-centered design for the drug guide and the quiz. This makes the solution intuitive for users unfamiliar with medical databases or complex digital tools. Our team developed a streamlined interface that reduces cognitive load while presenting critical information in a clear format.\n\nBuilt on peer-reviewed clinical data, the platform delivers insights that support informed conversations between patients and healthcare providers. The solution empowers individuals to explore treatment options confidently while giving clinicians a powerful resource for guiding personalized care decisions.",
      achievements: [
        'Transformed a complex pharmaceutical dataset into an intuitive quiz-based treatment discovery tool.',
        'Developed an algorithm with gastroenterologists to rank treatment options across safety, efficacy and convenience.',
        'Built a comprehensive, peer-reviewed drug database accessible to patients and clinicians.',
        'Designed a user-centered interface that simplifies complex medical information.',
        'Conducted extensive usability testing to reduce cognitive load and improve accessibility.',
        'Enabled healthcare professionals to deliver more personalized, data-driven treatment recommendations.',
      ],
      verticals: ['Health Care', 'Association & Non-Profit'],
      categories: ['Data / Infographics', 'User Experience Design'],
      client: 'American Gastroenterological Association / Knighten Health',
      url: 'https://ibddrugguide.gastro.org/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/ibd-drug-guide.jpg',
        header: {
          png: '/images/case-studies/headers/ibd-drug-guide.png',
          webp: '/images/case-studies/headers/ibd-drug-guide.webp',
        },
        project: {
          png: '/images/case-studies/projects/ibd-drug-guide.png',
          webp: '/images/case-studies/projects/ibd-drug-guide.webp',
        },
      },
    },
    {
      name: 'City Ratings',
      slug: 'city-ratings',
      dek: 'A complex, data-centric site ranking bikeability in cities around the globe',
      projectBrief:
        'THOR Digital and PeopleForBikes have been partners since 2020 producing annual editions of the City Ratings platform. This data-driven website ranks the bikeability of over 2500 cities across the globe. The platform translates complex mobility data into comparable scores and data visualizations that empower users to analyze what actually makes a city good for biking.',
      mainText:
        "To support its mission of making biking better for everyone, PeopleForBikes needed a platform capable of translating mobility data into actionable insight. THOR Digital developed the City Ratings platform to highlight the scoring system developed by PeopleForBikes that measures the quality of each city's bike network. It considers a wide range of factors like protected lanes, speed limits, safe crossings, and slow, shared streets.\n\nTHOR built a data pipeline that normalizes the data into visualizations like:\n\n• Bar graphs for each data point, per city and how each city ranks in relation to other cities\n• Time-series line graphs that contextualize each city's bikeability against peer cities over time\n• Heatmaps that show block-level bikeability in each city\n• Geolocated project locations that display where new bike infrastructure is getting built\n\nThe platform also functions as a powerful storytelling tool. Rich editorial content, curated city collections, and educational resources illustrate how top-performing cities achieve safer cycling environments. Clear explanations of methodologies provide practical guidance for city managers and advocates working to improve local infrastructure.\n\nCity Ratings empowers communities worldwide with the information needed to advocate for better policies, smarter infrastructure investments, and more accessible bicycling networks.",
      achievements: [
        'Scaled the platform from 510 cities at launch (2020) to 2,500+ cities globally in 2026.',
        'Served ~200K users upon relaunch last year, with an sustained average of ~50K users monthly',
        'Built a robust data architecture capable of processing and visualizing complex mobility datasets.',
        'Created intuitive city comparison tools using a mix of visualizations including heatmaps, line graphs and charts.',
        'Integrated advocacy storytelling with data through editorial collections and case studies.',
        'Enabled policymakers and advocates to identify proven infrastructure strategies for safer cycling.',
        'Expanded the platform from U.S.-focused coverage to a global bicycling benchmark.',
        'Leveraged analytics and user feedback to continuously refine UX and content strategy.',
      ],
      verticals: ['Outdoor', 'Associations'],
      categories: ['User Experience Design', 'Data / Infographics'],
      client: 'PeopleForBikes',
      url: 'https://cityratings.peopleforbikes.org/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/city-ratings.jpg',
        header: {
          png: '/images/case-studies/headers/city-ratings.png',
          webp: '/images/case-studies/headers/city-ratings.webp',
        },
        project: {
          png: '/images/case-studies/projects/city-ratings.png',
          webp: '/images/case-studies/projects/city-ratings.webp',
        },
      },
    },
    {
      name: 'Aerospace America Feature+ Articles',
      slug: 'aerospace-america-articles',
      dek: 'Custom editorial content from a decade of aerospace and aeronautics publication design',
      projectBrief:
        'THOR Digital partnered with American Institute of Aeronautics and Astronautics to expand the digital storytelling capabilities of Aerospace America through Feature+, a premium content format that transforms technical print stories into interactive web experiences. The initiative blends advanced data visualization, animation, and multimedia to deepen reader engagement.',
      mainText:
        "For nearly a decade, THOR Digital has collaborated with the American Institute of Aeronautics and Astronautics to design the award-winning publication, Aerospace America. Building on this long-standing partnership, THOR helped evolve the magazine's most compelling stories into immersive digital experiences through a new initiative known as Feature+.\n\nThe concept behind Feature+ was to transform the magazine's technical content—particularly custom illustrations and engineering infographics—into interactive web features. Working closely with the editorial team, THOR established a production workflow that allows selected print stories to be expanded into digital-first narratives without disrupting existing publishing timelines.\n\nEach Feature+ story leverages the strengths of digital media to communicate complex aerospace topics in accessible ways. Interactive diagrams, animated data visualizations, timelines, embedded video, and innovative page layouts help readers explore concepts more intuitively than static print formats allow.\n\nDespite operating with a small, agile team, THOR delivers a level of storytelling typically associated with much larger media organizations. The resulting library of Feature+ stories creates compelling content that strengthens reader engagement. The end result of our work drives recurring traffic to the publication's website and creates new opportunities for content distribution across external media.",
      achievements: [
        'Developed the Feature+ digital storytelling framework for Aerospace America.',
        'Transformed complex aerospace print content into interactive digital experiences.',
        'Built animated graphics, timelines, and data visualizations to explain technical topics clearly.',
        'Established a repeatable editorial workflow aligned with print production schedules.',
        'Enabled a small production team to deliver high-end multimedia storytelling efficiently.',
        'Created a scalable library of premium content for distribution across events and social platforms.',
      ],
      verticals: ['Construction / Engineering', 'Media / Publishing'],
      categories: ['Design', 'Data / Infographics'],
      client: 'American Institute of Aeronautics and Astronautics',
      url: 'https://aerospaceamerica.aiaa.org/features',
      images: {
        cardHorizontal:
          '/images/case-studies/cards-horizontal/aerospace-america-articles.jpg',
        header: {
          png: '/images/case-studies/headers/aerospace-america-articles.png',
          webp: '/images/case-studies/headers/aerospace-america-articles.webp',
        },
        project: {
          png: '/images/case-studies/projects/aerospace-america-articles.png',
          webp: '/images/case-studies/projects/aerospace-america-articles.webp',
        },
      },
    },
    {
      name: 'MASH App',
      slug: 'mash-app',
      dek: 'An Advanced App to Help Fight a Silent Epidemic',
      projectBrief:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      mainText:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
      verticals: ['Health Care', 'Association & Non-Profit'],
      categories: ['Mobile App'],
      client: 'American Gastroenterological Association',
      url: 'https://apps.apple.com/us/app/aga-nash-app/id1589270847',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/mash-app.jpg',
        header: {
          png: '/images/case-studies/headers/mash-app.png',
          webp: '/images/case-studies/headers/mash-app.webp',
        },
        project: {
          png: '/images/case-studies/projects/mash-app.png',
          webp: '/images/case-studies/projects/mash-app.webp',
        },
      },
    },
    {
      name: 'Chemonics Media Site',
      slug: 'chemonics-media-site',
      dek: 'An extensive documentary film gallery supporting international development efforts',
      projectBrief:
        'THOR Digital partnered with Chemonics International to create the Media Showcase, a dynamic microsite highlighting the organization’s documentary film portfolio. The campaign combines immersive video storytelling, refined design, and a flexible Webflow CMS to present impactful media projects. The design amplifies global development stories that enable Chemonics to promote and grow its film library.',
      mainText:
        "For decades, Chemonics International has produced documentary films that highlight grassroots efforts improving lives in developing countries. To better showcase this growing library and attract high-profile creative partners, the organization partnered with THOR Digital to design and build the Media Showcase. The goal for this project was to develop an immersive digital gallery dedicated to visual storytelling and international development.\n\nTHOR approached the project as more than a media archive. The goal was to create a compelling destination where film, photography, and narrative could work together to communicate the real-world impact of Chemonics' initiatives. The team designed a visually rich microsite centered on cinematic presentation, using large-format imagery, curated film collections, and dynamic layouts that bring each project to life.\n\nA key component of the experience was the creation of custom \"hero\" video reels. THOR combined Chemonics' original footage with carefully selected stock media, producing high-energy opening sequences that immediately immerse visitors in the stories behind the work.\n\nThe site was built using Webflow, providing both flexibility and speed while enabling Chemonics' team to easily manage and update content. The result is a modern, responsive media platform that elevates Chemonics' storytelling, strengthens its ability to engage collaborators, and ensures its documentary work reaches a broader global audience.",
      achievements: [
        'Produced cinematic hero video reels blending original footage with curated stock media.',
        'Created a visually immersive UX focused on large-format imagery and film-first storytelling.',
        'Built a flexible, scalable CMS using Webflow for easy internal content management.',
        'Delivered a fully responsive microsite optimized for fast performance and modern devices.',
        'Enabled Chemonics to showcase global development stories while attracting potential production partners.',
        'Integrated design, video production, development, and UX strategy within a single streamlined workflow.',
      ],
      verticals: ['Media & Publishing', 'Association & Non-Profit'],
      categories: ['Design', 'Campaign Website'],
      client: 'Chemonics',
      url: 'https://media.chemonics.org/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/chemonics-media-site.jpg',
        header: {
          png: '/images/case-studies/headers/chemonics-media-site.png',
          webp: '/images/case-studies/headers/chemonics-media-site.webp',
        },
        project: {
          png: '/images/case-studies/projects/chemonics-media-site.png',
          webp: '/images/case-studies/projects/chemonics-media-site.webp',
        },
      },
    },
    {
      name: 'Construction Executive Magazine',
      slug: 'construction-executive-magazine',
      dek: 'An Enhanced Experience for Digital and Print Readers',
      projectBrief:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      mainText:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
      verticals: ['Media & Publishing', 'Construction / Engineering'],
      categories: ['Publication Website'],
      client: 'Associated Builders & Contractors',
      url: 'https://www.constructionexec.com/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/construction-executive.jpg',
        header: {
          png: '/images/case-studies/headers/construction-executive.png',
          webp: '/images/case-studies/headers/construction-executive.webp',
        },
        project: {
          png: '/images/case-studies/projects/construction-executive.png',
          webp: '/images/case-studies/projects/construction-executive.webp',
        },
      },
    },
    {
      name: 'NIRI Investor Relations Rebrand',
      slug: 'niri-investor-relations-rebrand',
      dek: 'A New Look for an Opinion Leader',
      projectBrief:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      mainText:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
      verticals: ['Finance', 'Association & Non-Profit'],
      categories: ['Design'],
      client: 'National Investor Relations Institute',
      url: 'https://www.niri.org/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/niri.jpg',
        header: {
          png: '/images/case-studies/headers/niri.png',
          webp: '/images/case-studies/headers/niri.webp',
        },
        project: {
          png: '/images/case-studies/projects/niri.png',
          webp: '/images/case-studies/projects/niri.webp',
        },
      },
    },
    {
      name: 'Engineering Inc',
      slug: 'engineering-inc',
      dek: 'World-class digital publication for a pre-eminent engineering association',
      projectBrief:
        'THOR Digital partnered with American Council of Engineering Companies to transform Engineering Inc. from a traditional print publication into a modern digital-first magazine platform. The new website delivers long-form editorial storytelling, scalable content architecture, and integrated sponsorship opportunities—equipping ACEC with a flexible publishing system built for sustained audience growth and efficient editorial management.',
      mainText:
        "As part of a broader digital transformation, American Council of Engineering Companies partnered with THOR Digital to launch a new online home for its flagship publication, Engineering Inc.. The goal was to replace the print magazine with a dynamic digital platform capable of supporting editorial storytelling, industry insights, and long-term audience engagement.\n\nDrawing on its extensive experience designing publication websites for associations and industry media, THOR developed a fully customized digital magazine built on WordPress. The platform preserves the narrative depth of traditional print while introducing the advantages of digital publishing—searchability, cross-referenced content, multimedia integration, and flexible advertising placements.\n\nTHOR began with a comprehensive discovery phase that included stakeholder interviews, audience research, and a detailed audit of the print publication. These insights informed the site's information architecture, taxonomy, and content strategy, ensuring the platform could scale as the publication grows.\n\nThe resulting website features intuitive navigation, fast search capabilities, and structured editorial templates that allow a small editorial team to efficiently publish and manage ongoing content. By combining thoughtful UX design with durable technology infrastructure, THOR created a digital publishing system that positions Engineering Inc. for long-term success while opening new opportunities for sponsorship, audience development, and industry storytelling.",
      achievements: [
        'Developed a scalable publishing system using WordPress for long-term flexibility.',
        'Created a structured content taxonomy and editorial workflow for efficient production.',
        'Designed long-form article templates optimized for professional reading experiences.',
        'Implemented advanced search capabilities powered by Algolia.',
        'Integrated digital advertising and sponsorship placements to support new revenue streams.',
        'Built a platform that can be managed by a small editorial team with ongoing support from THOR Digital.',
      ],
      verticals: ['Construction / Engineering', 'Media / Publishing'],
      categories: ['Publications'],
      client: 'American Council of Engineering Companies',
      url: 'https://engineeringinc.acec.org/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/engineering-inc.jpg',
        header: {
          png: '/images/case-studies/headers/engineering-inc.png',
          webp: '/images/case-studies/headers/engineering-inc.webp',
        },
        project: {
          png: '/images/case-studies/projects/engineering-inc.png',
          webp: '/images/case-studies/projects/engineering-inc.webp',
        },
      },
    },
  ],
};
