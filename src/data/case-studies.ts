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
  url: string | null;
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
  featured?: boolean;
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
        cardHorizontal:
          '/images/case-studies/cards-horizontal/ibd-drug-guide.jpg',
        header: {
          png: '/images/case-studies/headers/ibd-drug-guide.png',
          webp: '/images/case-studies/headers/ibd-drug-guide.webp',
        },
        project: {
          png: '/images/case-studies/projects/ibd-drug-guide.png',
          webp: '/images/case-studies/projects/ibd-drug-guide.webp',
        },
      },
      featured: true,
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
        cardHorizontal:
          '/images/case-studies/cards-horizontal/city-ratings.jpg',
        header: {
          png: '/images/case-studies/headers/city-ratings.png',
          webp: '/images/case-studies/headers/city-ratings.webp',
        },
        project: {
          png: '/images/case-studies/projects/city-ratings.png',
          webp: '/images/case-studies/projects/city-ratings.webp',
        },
      },
      featured: true,
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
      featured: true,
    },
    {
      name: 'MASH App',
      slug: 'mash-app',
      dek: 'An Advanced App to Help Fight a Silent Epidemic',
      projectBrief:
        'THOR Digital partnered with Knighten Health to develop the MASH clinical app, a streamlined tool for physicians managing metabolic dysfunction-associated steatohepatitis (MASH). Built around a validated scoring system, the app delivers rapid, accurate patient assessments, supports pediatric and adult care, and serves as an educational and data-driven resource. It exemplifies how strategy, design, and technology converge in high-stakes clinical environments.',
      mainText:
        'The MASH app addresses a critical need in liver disease care by enabling physicians to assess metabolic dysfunction-associated steatohepatitis (MASH) efficiently and accurately. Using a validated scoring system, the app calculates disease severity, guiding practitioners through patient evaluation while highlighting key resources and best practices. Anonymized session data further supports research and ongoing improvements in clinical management.\n\nTHOR Digital approached the project strategically, beginning with discovery sessions with hepatology and gastroenterology specialists to understand workflows, pain points, and clinical priorities. Insights from these sessions shaped a streamlined user journey capable of delivering assessments in under 30 seconds, accommodating the demanding schedules of busy clinicians.\n\nDesign focused on readability, accessibility, and intuitive one-handed navigation. Iterative prototyping—from decision trees to working interfaces—ensured functionality aligned with real-world clinical needs. The final development phase produced an app meeting regulatory and app store requirements while supporting practical, daily use.\n\nPhysicians praised the MASH app for its speed, precision, and educational value, noting its utility in both adult and pediatric populations. By combining advanced strategy, user-centered design, and robust clinical functionality, the app sets a new standard for digital tools in liver disease management.',
      achievements: [
        'Implemented a clinical scoring system for rapid disease assessment',
        'Delivered accurate patient evaluations in under 30 seconds per session',
        'Integrated educational resources to support physician decision-making',
        'Conducted in-depth practitioner research to optimize workflow alignment',
        'Designed intuitive, accessible one-handed navigation',
        'Iteratively prototyped to ensure clinical accuracy and usability',
        'Established a scalable platform for ongoing MASH research and management',
      ],
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
        cardHorizontal:
          '/images/case-studies/cards-horizontal/chemonics-media-site.jpg',
        header: {
          png: '/images/case-studies/headers/chemonics-media-site.png',
          webp: '/images/case-studies/headers/chemonics-media-site.webp',
        },
        project: {
          png: '/images/case-studies/projects/chemonics-media-site.png',
          webp: '/images/case-studies/projects/chemonics-media-site.webp',
        },
      },
      featured: true,
    },
    {
      name: 'Construction Executive Magazine',
      slug: 'construction-executive-magazine',
      dek: 'An Enhanced Experience for Digital and Print Readers',
      projectBrief:
        'THOR Digital partnered with the Association of Builders and Contractors to transform Construction Executive through a full print redesign, digital publication development, and ongoing print production. THOR created a unified, scalable platform that enhances user experience, streamlines advertising, and positions Construction Executive as a modern, authoritative resource for the engineering and construction community.',
      mainText:
        "THOR Digital embarked on a comprehensive redesign and digital transformation for ABC's Construction Executive, elevating both the print and online experience. The project began with a meticulous print redesign, refreshing layout, typography, and imagery to prioritize readability, editorial coherence, and visual appeal. The revitalized print edition strengthened the publication's brand identity and reinforced its status as a leading construction industry resource.\n\nBuilding on this foundation, THOR developed a world-class digital publication site leveraging headless architecture for flexibility and scalability. Advanced CMS integration and a sophisticated taxonomy system enable automated content repurposing across pages, enhancing discoverability and user engagement. The platform incorporates seamless authentication, best-in-class search functionality, and a robust automated advertising program, maximizing revenue opportunities.\n\nDesigned for future growth, the site allows ABC to expand functionality and adapt to evolving audience needs. By unifying print and digital identities and combining innovative technology with award-winning design, THOR created a publication ecosystem that delivers a seamless, engaging, and authoritative experience for construction professionals across all channels.",
      achievements: [
        'Award-winning print redesign enhancing readability and visual appeal',
        'Developed advanced headless digital platform for scalability and flexibility',
        'Integrated CMS and taxonomy for automated content repurposing',
        'Implemented best-in-class search and user authentication',
        'Built robust automated advertising system to maximize revenue',
        'Aligned print and digital design for a unified brand identity',
        'Future-proofed platform for ongoing growth and functionality expansion',
      ],
      verticals: ['Media & Publishing', 'Construction / Engineering'],
      categories: ['Publication Website'],
      client: 'Associated Builders & Contractors',
      url: 'https://www.constructionexec.com/',
      images: {
        cardHorizontal:
          '/images/case-studies/cards-horizontal/construction-executive.jpg',
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
      dek: 'A modern and scaleable brand for a financial institute, and one of THOR’s long time clients',
      projectBrief:
        'THOR Digital has partnered with NIRI for over two decades, delivering award-winning design solutions that elevate the association’s presence within the financial sector. From its flagship publication to a comprehensive brand overhaul, THOR has consistently translated complex investor relations messaging into clear, compelling visual communications across print, digital, and experiential platforms.',
      mainText:
        "THOR Digital's long-standing partnership with NIRI: The Association for Investor Relations represents an example of sustained creative collaboration built on trust, consistency, and deep institutional knowledge. Over more than 20 years, THOR has supported NIRI across hundreds of initiatives, helping the organization communicate complex financial narratives with clarity and authority.\n\nThe relationship began with IR Update, NIRI's flagship publication, where THOR established a strong editorial design system tailored to the investor relations community. From this foundation, the partnership expanded into a full spectrum of creative services, including marketing collateral, advertising campaigns, annual reports, and large-scale tradeshow environments.\n\nTHOR's ability to translate dense financial data into engaging, accessible design became a defining strength. Whether through meticulously structured reports or visually compelling expo graphics, each deliverable reinforced NIRI's credibility and leadership within the industry.\n\nA major milestone came with the comprehensive rebrand of NIRI. Leveraging years of insight, THOR developed a modernized identity system, including a refined logo and detailed brand guidelines to ensure consistency across all touchpoints. The result was a cohesive, forward-looking brand that reflects the sophistication of the financial sector while strengthening engagement with its members and stakeholders.",
      achievements: [
        'Led a comprehensive, modern brand identity overhaul',
        'Established detailed brand guidelines for long-term consistency',
        'Sustained a 20+ year strategic creative partnership',
        "Designed and evolved NIRI's flagship publication, IR Update",
        'Delivered hundreds of print, digital, and experiential projects',
        'Translated complex financial data into clear, engaging design',
        'Created impactful tradeshow and environmental graphics',
      ],
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
      featured: true,
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
        cardHorizontal:
          '/images/case-studies/cards-horizontal/engineering-inc.jpg',
        header: {
          png: '/images/case-studies/headers/engineering-inc.png',
          webp: '/images/case-studies/headers/engineering-inc.webp',
        },
        project: {
          png: '/images/case-studies/projects/engineering-inc.png',
          webp: '/images/case-studies/projects/engineering-inc.webp',
        },
      },
      featured: true,
    },
    {
      name: "Let's Beat HCM",
      slug: 'lets-beat-hcm',
      dek: 'An awareness site dedicated to a serious heart condition affecting African-Americans',
      projectBrief:
        'THOR Digital partnered with Knighten Health and the Association of Black Cardiologists to develop Let’s Beat HCM, a microsite raising awareness of hypertrophic cardiomyopathy (HCM) in Black patients. The site provides curated educational resources, regional expert trainer listings, event calendars, and peer-to-peer training materials, empowering primary care practitioners to identify and manage HCM effectively while addressing racial disparities in cardiovascular care.',
      mainText:
        "Let's Beat HCM is designed to educate medical professionals on hypertrophic cardiomyopathy (HCM) in Black patients, emphasizing early diagnosis in younger, athletic populations. THOR Digital crafted a highly designed, easy-to-navigate microsite that balances complex medical content with an engaging, user-friendly experience.\n\nThe site features regional expert trainer listings, a calendar of ongoing educational events, a library of research papers, and multimedia presentations to support a peer-to-peer \"train-the-trainer\" model. Each section was designed to guide primary care providers through best practices in screening, diagnosis, and patient management, while highlighting disparities in care and access barriers specific to Black communities.\n\nBuilt on a user-friendly content management platform, the site allows Knighten Health and ABC staff to manage updates without external support. THOR Digital ensured that the site's visual identity and narrative resonate with both medical professionals and younger audiences, making a complex health issue approachable and actionable.\n\nBy combining strategic planning, high-impact design, and a flexible technical foundation, Let's Beat HCM serves as an educational hub, a community-building platform, and a resource for improving cardiovascular equity.",
      achievements: [
        'Developed a visually engaging brand for HCM education',
        'Curated expert trainer listings and interactive event calendar',
        'Integrated research papers and multimedia presentations for peer learning',
        'Implemented a user-friendly CMS for easy content management',
        'Delivered a platform supporting ongoing professional education and advocacy',
      ],
      verticals: ['Health Care'],
      categories: ['Campaign'],
      client: 'Association of Black Cardiologists',
      url: 'https://www.letsbeathcm.org/',
      images: {
        cardHorizontal:
          '/images/case-studies/cards-horizontal/lets-beat-hcm.jpg',
        header: {
          png: '/images/case-studies/headers/lets-beat-hcm.png',
          webp: '/images/case-studies/headers/lets-beat-hcm.webp',
        },
        project: {
          png: '/images/case-studies/projects/lets-beat-hcm.png',
          webp: '/images/case-studies/projects/lets-beat-hcm.webp',
        },
      },
      featured: true,
    },
    {
      name: 'Leon Hotel',
      slug: 'leon-hotel',
      dek: 'Emergency branding effort for a premium Manhattan hotel property',
      projectBrief:
        'THOR Digital partnered with the Leon Hotel in Manhattan after a trademark conflict forced an urgent rebrand. Within two weeks, the team rebuilt the brand from the ground up, developing a refined visual identity rooted in strategic positioning. The result was a cohesive, modern brand system applied across every guest touchpoint, restoring confidence and elevating the hotel’s market presence overall.',
      mainText:
        "THOR Digital was brought in at a critical moment for the Leon Hotel, a boutique property in Manhattan facing legal and reputational risk after its newly launched identity infringed on an existing trademark. With operations ongoing and materials already in circulation, the need for a rapid yet thoughtful solution was paramount.\n\nDrawing on years of brand development expertise, THOR initiated an accelerated discovery and design process, distilling the hotel's positioning, audience expectations, and long-term ambitions into a clear strategic foundation. Multiple identity directions were explored in parallel, allowing the team to quickly iterate and refine toward a single, confident solution.\n\nWithin just two weeks, THOR delivered a sleek, modern logo and a vibrant identity system designed for consistency and flexibility. The new brand was meticulously implemented across all guest and operational touchpoints, including key cards, stationery, menus, signage, and architectural elements such as stone carvings.\n\nThe result was more than a recovery effort. THOR transformed a high-risk situation into an opportunity for differentiation, equipping the Leon Hotel with a distinctive, legally sound, and memorable brand that resonates with guests and supports its continued growth in a competitive market while reinforcing its identity as a modern urban boutique destination.",
      achievements: [
        'Delivered a complete brand redesign under a strict two-week deadline',
        'Developed and refined multiple strategic brand directions rapidly',
        'Created a cohesive visual system applied across all guest touchpoints',
        'Extended branding into physical architecture, including stonework',
        'Turned a crisis into a long-term brand growth opportunity',
      ],
      verticals: ['Hospitality'],
      categories: ['Design'],
      client: 'Leon Hotel',
      url: 'https://leonhotelnyc.com/',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/leon-hotel.jpg',
        header: {
          png: '/images/case-studies/headers/leon-hotel.png',
          webp: '/images/case-studies/headers/leon-hotel.webp',
        },
        project: {
          png: '/images/case-studies/projects/leon-hotel.png',
          webp: '/images/case-studies/projects/leon-hotel.webp',
        },
      },
    },
    {
      name: 'Citiva',
      slug: 'citiva',
      dek: 'Fashion-inspired branding for a sleek Manhattan medical marijuana dispensary',
      projectBrief:
        'THOR Digital partnered with Citiva, a Manhattan-based medicinal cannabis brand, to create a premium identity that redefined expectations in the retail space. Inspired by luxury and fashion, the engagement encompassed packaging, apparel, and in-store design. The result was a cohesive, elevated brand experience that positioned Citiva at the forefront of modern cannabis retail.',
      mainText:
        "THOR Digital's collaboration with Citiva marked a bold step into the evolving world of upscale medicinal cannabis retail. In a category often defined by inconsistent branding, Citiva set out to distinguish itself as a premium, design-forward experience—drawing inspiration from the sophistication of luxury fashion and the clarity of modern technology retail environments.\n\nTHOR began by establishing a strategic foundation, defining Citiva's positioning, audience, and long-term vision. This clarity informed a visual identity that balanced refinement with approachability, ensuring the brand resonated with both seasoned consumers and newcomers seeking a trusted, elevated experience.\n\nThe design system extended across a comprehensive suite of brand expressions. THOR developed product packaging that felt more akin to high-end cosmetics than traditional cannabis products, alongside apparel that reinforced brand culture and visibility. The retail environment was approached holistically, with every detail—materials, layout, and visual cues—crafted to evoke the seamless, curated feel of a modern flagship store.\n\nThe result was a cohesive and differentiated brand that elevated perceptions of medicinal cannabis retail. Citiva emerged with a distinctive presence, delivering a consistent, premium experience that aligns with evolving consumer expectations and sets a new benchmark within the category.",
      achievements: [
        'Positioned Citiva as a premium, design-led cannabis brand',
        'Developed a full suite of elevated product packaging',
        'Created branded apparel to extend identity beyond retail',
        'Aligned visual identity with luxury and fashion-inspired cues',
        'Delivered a scalable system supporting long-term brand growth',
      ],
      verticals: ['Retail'],
      categories: ['Branding'],
      client: 'Citiva',
      url: null,
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/citiva.jpg',
        header: {
          png: '/images/case-studies/headers/citiva.png',
          webp: '/images/case-studies/headers/citiva.webp',
        },
        project: {
          png: '/images/case-studies/projects/citiva.png',
          webp: '/images/case-studies/projects/citiva.webp',
        },
      },
    },
    {
      name: 'Hungry for Batteries',
      slug: 'hungry-for-batteries',
      dek: 'A character driven campaign site encouraging the safe disposal of e-bike batteries',
      projectBrief:
        'THOR Digital partnered with People for Bikes to create Hungry for Batteries, a dynamic microsite promoting e-bike battery recycling. Through a character-driven narrative starring Watts and Rey, the site blends interactive storytelling, animation, and whimsical illustrations to educate users on responsible recycling practices. It demonstrates how creativity and technology converge to make environmental sustainability engaging and accessible.',
      mainText:
        "Hungry for Batteries transforms a critical environmental message into an engaging digital experience. The microsite leverages playful characters, Watts and Rey, to guide users through the importance of recycling e-bike batteries, presenting a complex topic in a fun, approachable way.\n\nTHOR Digital collaborated closely with the illustration team at In Good Taste to translate these characters and their narrative into a seamless web experience, integrating animations, interactive elements, and intuitive navigation.\n\nThe site offers educational content alongside immersive interactivity, balancing entertainment and environmental responsibility. Users can explore battery recycling locations, learn about participating brands, and engage with the narrative at their own pace. Each visual and interactive component was carefully crafted to maintain user engagement while reinforcing the sustainability message.\n\nBeyond design and development, the project highlights THOR Digital's ability to merge storytelling and technology. By creating an experience that is both informative and delightful, Hungry for Batteries successfully raises awareness about e-bike battery recycling, encouraging responsible action across a wide audience and setting a benchmark for environmental digital campaigns.",
      achievements: [
        'Created an immersive, character-driven narrative for environmental education',
        'Collaborated effectively with In Good Taste on detailed illustrations',
        'Developed intuitive, user-friendly navigation for complex information',
        'Promoted sustainable e-bike battery disposal nationwide',
        'Highlighted industry partnerships and recycling locations dynamically',
      ],
      verticals: ['Outdoor'],
      categories: ['Campaign'],
      client: 'PeopleForBikes',
      url: 'https://www.hungryforbatteries.org/',
      images: {
        cardHorizontal:
          '/images/case-studies/cards-horizontal/hungry-for-batteries.jpg',
        header: {
          png: '/images/case-studies/headers/hungry-for-batteries.png',
          webp: '/images/case-studies/headers/hungry-for-batteries.webp',
        },
        project: {
          png: '/images/case-studies/projects/hungry-for-batteries.png',
          webp: '/images/case-studies/projects/hungry-for-batteries.webp',
        },
      },
    },
    {
      name: 'Keep Riding',
      slug: 'keep-riding',
      dek: 'Campaign site encouraging cyclists to stay connected with their communities',
      projectBrief:
        'THOR Digital developed Keep Riding for People for Bikes, a campaign microsite encouraging cyclists to explore and connect with their communities. Built on WebFlow, the site leverages a low-code, rapid deployment approach with a simple CMS, brand-consistent design, curated cycling routes, and community-focused features. It empowers cyclists of all levels while fostering local engagement and promoting safe, enjoyable riding experiences.',
      mainText:
        "Keep Riding redefines what a cycling advocacy site can be by combining practical resources, community engagement, and adventure inspiration in a single platform. THOR Digital used WebFlow to rapidly build a low-code, easy-to-manage site, enabling fast deployment while maintaining brand consistency and flexibility for ongoing updates.\n\nThe site features meticulously curated cycling routes, catering to riders of all skill levels, from casual city cyclists to seasoned trail enthusiasts. Each route highlights scenic landmarks, hidden gems, and regional attractions, turning ordinary rides into memorable journeys.\n\nCommunity building is central to the platform, with ride ambassadors connecting cyclists through group rides, mentorship, and tips. This network fosters camaraderie and encourages participation while reinforcing People for Bikes' mission to strengthen cycling culture.\n\nThe knowledge hub further supports riders with safety guidelines, maintenance tips, and cycling etiquette, empowering newcomers and veterans alike to ride confidently. By integrating visually engaging design, user-friendly navigation, and content-rich features, Keep Riding creates an immersive experience that inspires exploration, connection, and empowerment. The platform demonstrates THOR Digital's ability to merge technical efficiency with meaningful community impact.",
      achievements: [
        'Rapid low-code deployment via WebFlow, enabling quick launch',
        'Developed a simple, scalable CMS for ongoing content management',
        'Designed a brand-consistent, visually engaging user interface',
        'Curated cycling routes tailored to all skill levels',
        'Built community features connecting riders through ambassadors',
        'Created a comprehensive knowledge hub for safety and maintenance',
        'Delivered a platform fostering exploration, empowerment, and engagement',
      ],
      verticals: ['Outdoor'],
      categories: ['Campaign'],
      client: 'PeopleForBikes',
      url: null,
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/keep-riding.jpg',
        header: {
          png: '/images/case-studies/headers/keep-riding.png',
          webp: '/images/case-studies/headers/keep-riding.webp',
        },
        project: {
          png: '/images/case-studies/projects/keep-riding.png',
          webp: '/images/case-studies/projects/keep-riding.webp',
        },
      },
    },
    {
      name: 'No Kid Hungry',
      slug: 'no-kid-hungry',
      dek: 'A campaign supporting No Kid Hungry helping to feed children across the US',
      projectBrief:
        'THOR Digital developed an early campaign platform for No Kid Hungry, centered on the \"What Are You Hungry For\" initiative. The project engaged teens through an Instagram-driven photo contest that encouraged creative self-expression. By combining social participation, daily incentives, and thoughtful storytelling, the platform helped generate awareness, engagement, and early momentum for a growing national cause.',
      mainText:
        'THOR Digital played a key role in shaping the early digital presence of the No Kid Hungry campaign by designing and developing an interactive platform built around the "What Are You Hungry For" concept. Rather than focusing solely on food insecurity, the campaign reframed "hunger" as a symbol of ambition, inviting teens to share images representing their passions, talents, and aspirations.\n\nThe campaign centered on a curated Instagram photo contest, where participants submitted daily entries for the chance to win prizes from premium technology and fashion brands. THOR engineered a seamless, mobile-first website experience that integrated social media participation with structured content moderation and display. This ensured both accessibility and a safe, positive environment for a younger audience.\n\nA major focus of the project was ethical engagement. THOR implemented best practices for marketing to teens, emphasizing authenticity, inclusivity, and responsible data and content management. The team also curated submissions to maintain quality and alignment with campaign values.\n\nIn addition to digital execution, THOR developed supporting print materials to extend campaign visibility. The result was a highly engaging platform that contributed to the campaign\'s early success, helping it evolve into a nationally recognized initiative with broad cultural and celebrity support.',
      achievements: [
        'Launched an engaging, mobile-first campaign platform tailored to teen audiences',
        'Created a successful Instagram-driven contest model that encouraged daily participation',
        'Applied ethical marketing practices to foster a safe and inclusive user environment',
        'Curated high-quality user-generated content aligned with campaign messaging',
        'Integrated digital and print assets for a cohesive, multi-channel campaign',
      ],
      verticals: ['Philanthropy'],
      categories: ['Campaign'],
      client: 'Share Our Strength',
      url: null,
      images: {
        cardHorizontal:
          '/images/case-studies/cards-horizontal/no-kid-hungry.jpg',
        header: {
          png: '/images/case-studies/headers/no-kid-hungry.png',
          webp: '/images/case-studies/headers/no-kid-hungry.webp',
        },
        project: {
          png: '/images/case-studies/projects/no-kid-hungry.png',
          webp: '/images/case-studies/projects/no-kid-hungry.webp',
        },
      },
    },
    {
      name: 'Mayflower',
      slug: 'mayflower',
      dek: 'An online e-commerce portal for a Boston medicinal marijuana outlet',
      projectBrief:
        'THOR Digital designed and developed a sophisticated e-commerce platform for Mayflower, a leading Boston-based medicinal marijuana dispensary. The project unified multiple business systems—including retail locations, production, and distribution—into a seamless digital experience. With a strong focus on education, compliance, and user experience, the platform set a new standard for ethical, consumer-focused cannabis e-commerce.',
      mainText:
        "THOR Digital partnered with Mayflower to create a robust, highly branded e-commerce platform tailored to the unique needs of a modern medicinal marijuana business. The project required more than a traditional online store—it demanded a fully integrated system connecting retail locations, production facilities, distribution channels, and point-of-sale operations into a single, cohesive backend infrastructure.\n\nTHOR engineered a state-of-the-art platform that streamlined inventory management, ensured real-time accuracy across locations, and supported regulatory compliance in a rapidly evolving industry. On the front end, the site delivered a visually rich, intuitive user experience designed to build trust and guide customers through complex purchasing decisions.\n\nA key component of the platform was its emphasis on education. THOR developed comprehensive informational sections covering product types, safe usage practices, and responsible consumption. This approach reinforced Mayflower's commitment to transparency and ethical business practices while empowering customers to make informed decisions.\n\nBy combining best practices in e-commerce design with a thoughtful, compliance-driven approach to cannabis retail, THOR delivered a scalable platform that enhanced operational efficiency, strengthened brand identity, and elevated the overall customer experience in a highly regulated market.",
      achievements: [
        'Built a fully integrated backend system connecting retail, production, and distribution operations',
        'Delivered a visually engaging, brand-forward e-commerce experience',
        'Developed real-time inventory and POS synchronization across multiple locations',
        'Designed comprehensive educational content promoting safe and informed product use',
        'Established a scalable digital foundation for continued business growth',
      ],
      verticals: ['Retail'],
      categories: ['eCommerce'],
      client: 'iAnthus Capital',
      url: null,
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/mayflower.jpg',
        header: {
          png: '/images/case-studies/headers/mayflower.png',
          webp: '/images/case-studies/headers/mayflower.webp',
        },
        project: {
          png: '/images/case-studies/projects/mayflower.png',
          webp: '/images/case-studies/projects/mayflower.webp',
        },
      },
    },
    {
      name: 'NYSCheck',
      slug: 'nyscheck',
      dek: 'A New York State - Mount Sinai Hospital System collaboration to help needy children stay healthy',
      projectBrief:
        'THOR Digital partnered with NYSCheck, a New York State - Mount Sinai Hospital collaboration, to reimagine its digital platform for delivering preventative health guidance. Through a rigorous discovery process and technical overhaul, THOR created a scalable, user-friendly system that enables healthcare providers to deliver personalized, non-clinical "prescriptions" based on environmental, regional, and seasonal health factors.',
      mainText:
        'THOR Digital collaborated with NYSCheck to transform an aging digital platform into a modern, flexible system for delivering personalized public health guidance to New York State residents. The engagement began with an in-depth discovery phase, including stakeholder interviews, system audits, and detailed reporting, which informed a long-term roadmap for both technical and user experience improvements.\n\nA major challenge was modernizing legacy infrastructure without disrupting existing services. THOR addressed this by rebuilding the platform\'s foundation, resolving technical debt, and creating a scalable architecture designed for future enhancements. The new system introduced a card-based user interface paired with a carefully structured taxonomy, enabling content to be dynamically organized by region, season, and topic.\n\nThis approach empowered healthcare providers to create and share tailored "prescriptions"—not medications, but curated sets of guidance designed to help individuals respond to environmental risks such as extreme heat, pollution, and chemical exposure. The system emphasizes preventative care through accessible, actionable information.\n\nBy applying best practices in web development, content strategy, and UX design, THOR delivered a resilient platform that improves information delivery, supports public health goals, and provides a strong foundation for ongoing innovation and expansion.',
      achievements: [
        'Led a comprehensive discovery process with stakeholder interviews and actionable reporting',
        'Modernized legacy systems to create a stable, scalable technical foundation',
        'Designed an intuitive card-based UI to improve content accessibility and usability',
        'Developed a robust taxonomy enabling dynamic content sorting by region, season, and topic',
        'Enabled healthcare providers to deliver personalized, preventative \"prescriptions\"',
      ],
      verticals: ['Philanthropy'],
      categories: ['User Experience'],
      client: 'New York State / Mount Sinai Hospital System',
      url: '',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/nyscheck.jpg',
        header: {
          png: '/images/case-studies/headers/nyscheck.png',
          webp: '/images/case-studies/headers/nyscheck.webp',
        },
        project: {
          png: '/images/case-studies/projects/nyscheck.png',
          webp: '/images/case-studies/projects/nyscheck.webp',
        },
      },
      featured: true,
    },
    {
      name: 'LTK',
      slug: 'ltk',
      dek: 'A website supporting and celebrating a railroad development titan',
      projectBrief:
        'THOR Digital partnered with LTK, an international rail systems firm with over a century of history, to redesign and develop its primary website. Through an in-depth, on-site discovery process, THOR created a modern, CMS-driven platform that highlights LTK’s legacy, showcases decades of project work, and empowers internal teams to manage and scale content effectively.',
      mainText:
        "THOR Digital collaborated closely with LTK to reimagine its digital presence, balancing the firm's rich 100+ year legacy with the needs of a modern, global audience. The engagement began with a rigorous, in-person discovery process, with THOR working on-site alongside LTK leadership to align on business goals, brand positioning, and content strategy. This hands-on approach ensured that the final product reflected both the company's heritage and its forward-looking vision.\n\nThe resulting platform was built on a robust, flexible CMS designed to manage and showcase LTK's extensive portfolio of case studies. THOR structured the system to make it easy for internal teams to organize, update, and expand content without technical friction. A significant portion of the site was dedicated to storytelling—tracing LTK's evolution from its founding to its position as a leader in the rail industry.\n\nIn addition to development, THOR provided comprehensive training to LTK staff, ensuring long-term sustainability and independence in managing the platform. By applying best practices in CMS architecture, user experience design, and collaborative discovery, THOR delivered a scalable, future-ready website that strengthens LTK's brand and supports continued growth.",
      achievements: [
        'Conducted an in-depth, on-site discovery process with executive leadership',
        'Designed and developed a scalable, user-friendly CMS for ongoing content management',
        'Structured and showcased decades of case studies in an accessible, organized format',
        "Crafted a compelling digital narrative highlighting LTK's 100+ year legacy",
        'Delivered hands-on training to empower internal teams to manage and update the site',
      ],
      verticals: ['Construction / Engineering'],
      categories: ['Discovery'],
      client: 'LTK',
      url: '',
      images: {
        cardHorizontal: '/images/case-studies/cards-horizontal/ltk.jpg',
        header: {
          png: '/images/case-studies/headers/ltk.png',
          webp: '/images/case-studies/headers/ltk.webp',
        },
        project: {
          png: '/images/case-studies/projects/ltk.png',
          webp: '/images/case-studies/projects/ltk.webp',
        },
      },
    },
  ],
};
