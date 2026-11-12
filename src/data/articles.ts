import { howWeWorkGroups, type HowWeWorkArticle } from './how-we-work';
import type { PageStatus } from './site-content';

export type ArticleSection =
  | { type: 'paragraph'; text: string; lead?: boolean }
  | { type: 'heading'; id: string; text: string }
  | { type: 'subheading'; id: string; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | {
      type: 'image';
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | {
      type: 'callout';
      title: string;
      text: string;
      contact?: boolean;
      link?: { href: string; label: string };
    }
  | {
      type: 'phases';
      items: { title: string; text: string; articleSlug?: string }[];
    };

export interface Article {
  slug: string;
  status: PageStatus;
  lede: string;
  imageAlt?: string;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: 'how-a-website-is-built',
    status: 'ready',
    lede: 'There was a time when the web was so simple. Start with a nav bar and clunky text, throw in some pixelated icons and voila — website! No one had yet used the words “geo-targeting” or “chatbot”. It’s all become much more complex. Take a deep breath, relax, and allow us to help steer your web dev journey.',
    imageAlt: 'Long desert highway stretching toward the sunset',
    sections: [
      {
        type: 'paragraph',
        text: 'Websites are composed of countless interdependent elements that work together to form a complete end product. Successful web projects are built using well-crafted content as their foundation and they organically build an audience via a sensible user experience. Because modern web users exist in a dense information environment they need all the help they can get to navigate the digital environment.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'This is where a partner like THOR can help turn your ambitions into a tangible product. From our deep experience in the field we have developed informed, market-tested ways to deliver successful digital projects and communications. The list of development phases below provides a guide to our methods and a top-level view of what you can expect in an engagement with THOR.',
      },
      {
        type: 'quote',
        text: '“Successful web projects are built using well-crafted content as their foundation.”',
      },
      {
        type: 'heading',
        id: 'website-project-phases',
        text: 'The phases of a website project',
      },
      {
        type: 'phases',
        items: [
          {
            title: 'Discovery',
            text: 'This process helps project participants level-set on expectations and allows our team to gain a general background understanding of your organization. We start this process with interviews and surveys to get a general sense of the competitive landscape. We include personas of key customers and constituencies, perform site audits, and make content strategy recommendations. At the end of the process our report summarizes the results of the discovery work and offers an illuminating and objective look at the overall organization.',
            articleSlug: 'discovery-process',
          },
          {
            title: 'Architecture',
            text: 'THOR weaves information architecture through every phase of a given project. At the foundational level we develop data models based on the modular nature of modern websites. This allows us to mix content blocks together as needed to meet your content needs. We prototype these modular elements within the content management system to give a preview of how the content will look, feel, and function in a live website. The process is iterative and collaborative as we build the product.',
            articleSlug: 'architecture',
          },
          {
            title: 'Design and Development',
            text: 'Websites are interdisciplinary and for that reason, so is the workflow at THOR. We transition elements from the architecture phase directly into our design and development work by building prototypes and comps that put work in front of our clients as rapidly as it becomes available. We create staging sites for review, clickable prototypes for design approval, and collect feedback along the way.',
            articleSlug: 'design-and-development',
          },
          {
            title: 'Project Management',
            text: 'Behind the scenes, THOR manages our projects with agile methods that accelerate delivery by concentrating on the tasks at hand. For larger projects we utilize Github to maintain development momentum and Trello as a visionary planning device. Trello keeps everyone abreast of near- and long-term milestones. This pattern of sprint-based implementation management and a bird’s-eye view of the overall project is the backbone of our process.',
            articleSlug: 'project-management',
          },
        ],
      },
    ],
  },
  {
    slug: 'discovery-process',
    status: 'ready',
    lede: 'Starting a web project without first conducting a discovery process is like putting on a blindfold and hiking the Grand Canyon. It’s exciting, but likely ends in disaster.',
    sections: [
      {
        type: 'paragraph',
        text: 'At the core of every great website is compelling content and a complementary design that expresses how an organization wants to be perceived. Many brands have a notion of this idea in their public presence but may not fully grasp the intricate infrastructure needed to ensure your website evokes genuine resonance with the audience. Figuring out how to elevate an organization’s public presence is a complicated process that requires critical examination.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'THOR is a believer in the power of the discovery process and the benefits it provides for organizations that we partner with. At the core, the discovery phase of a communications project is a journey through an organization’s past, present, and future. Within this process we delve into the workflow of the organization to include the customer journeys, the web of legacy systems, and the people that make an organization work.',
      },
      {
        type: 'paragraph',
        text: 'While some of the information garnered from the process is concrete, some can be abstract. How do you quantify what is truly working and what isn’t? What represents good design? What does success mean and how do we know when we’ve achieved it? While much of this sounds subjective at the surface, most websites contain patterns that organizations can identify and use to improve their performance and improve the experience for website users.',
      },
      {
        type: 'paragraph',
        text: 'THOR’s discovery process uncovers the aspects of your website and communications strategy that are most in need of upgrades and leads to a roadmap for a successful project.',
      },
      {
        type: 'heading',
        id: 'a-past',
        text: 'Looking to the past for answers',
      },
      {
        type: 'paragraph',
        text: 'THOR prefers to begin a discovery process with an introspective look at the organization. We perform a series of interviews that include key stakeholders as well as front-line workers who, while potentially less involved in the overall project, play a crucial role in the hands-on work in the systems and often offer pertinent insights into technology decisions.',
      },
      {
        type: 'paragraph',
        text: 'These interviews form a foundational layer to our understanding of the organization and a genuine assessment of the way the company sees itself.',
      },
      {
        type: 'paragraph',
        text: 'We perform the same activity with customers and members of key constituencies that the organization is trying to reach. The goal of these parallel interviews is to evaluate whether an organization and their audience see things the same way.',
      },
      {
        type: 'quote',
        text: '“Often this is the most revealing part of our process, with answers that diverge in unexpected ways.”',
      },
      {
        type: 'paragraph',
        text: 'The results give stakeholders a chance to reevaluate their prior assumptions and, in an ideal scenario, to adjust the direction of their project to match the data. If we’re looking at a new website build, these insights can inform the list of necessary features and content in a similar way.',
      },
      {
        type: 'heading',
        id: 'a-quant',
        text: 'Quantifying success',
      },
      {
        type: 'paragraph',
        text: 'Interviews tell us the direction the wind is blowing but don’t always tell us how strong the gale is. We quantify the opinions in the interviews with survey data in which internal and external audiences rate aspects of the organization and its website on a sliding scale. These ratings help us determine the areas of the site that are working and where the biggest needs can be found. They can also help us see if the tone and language of the communications match the design and technology of the brand.',
      },
      {
        type: 'paragraph',
        text: 'Alongside the survey, THOR performs a site audit that tangibly outlines the sections and components of the site that function properly and those that need help. We follow this with detailed recommendations regarding the tools that the organization should use. Would-be clients can review our Website 101 for a sense of the solutions and tools THOR favors with the understanding that our process is generally customized to an organization’s needs.',
      },
      {
        type: 'paragraph',
        text: 'Our Finding Report synthesizes all of these discovery tasks into a roadmap where we aim to keep what’s working, improve what isn’t, and move the organization closer to its goals with our recommendations.',
      },
      {
        type: 'paragraph',
        text: 'As an example, organizations that find themselves drowning in legacy technology are generally the most eager to tear their entire infrastructure down and start over. But more often than not, migration into better systems is a gradual process that is informed by data. Similarly, new website roadmaps frequently bloat the feature pipeline at the expense of being able to release the site in a timely manner. These are the types of situations where partnering with THOR gives you immediate and ongoing access to our expertise to focus the effort and save countless development and design hours.',
      },
      {
        type: 'heading',
        id: 'a-audience',
        text: 'Audience development',
      },
      {
        type: 'paragraph',
        text: 'The last part of our discovery process typically includes strategic recommendations around content development that is derived from our audience analysis work. Many of our clients choose to develop content for their projects in house, which is one reason why THOR makes strategic recommendations regarding the development of content and its value to intended audiences.',
      },
      {
        type: 'paragraph',
        text: 'One of our favorite strategies is known as a long tail content strategy in which THOR helps refine organizational goals into a flexible taxonomy of terms typically composed of 15-20 key words or phrases. These act as a lodestar to help an organization focus their communication efforts in the coming years by building earned media through search and social channels around the terms. This delivers data to analyze and, should internal staff undergo personnel changes, new team members can rely on those THOR tools for insight while they focus on content.',
      },
      {
        type: 'heading',
        id: 'a-cost',
        text: 'Scheduling and costs',
      },
      {
        type: 'callout',
        title: 'Typical engagement · 1–2 months',
        text: 'Discovery engagements typically take place over the course of 1-2 months and include interviews, surveys, audience analysis, personas and site audits. The findings are tied together in a single report that is presented to the organization by our team. We position these tasks ahead of design and development work to be certain that we are optimizing our efforts once the project begins in earnest. Reach out to THOR and begin your journey with us today.',
        contact: true,
      },
    ],
  },
  {
    slug: 'architecture',
    status: 'ready',
    lede: 'Poorly functioning website? Backlog of unusable content? Search tools that aren’t working? The issues are almost certainly caused by overlooking the critical phase of Site Architecture.',
    sections: [
      {
        type: 'paragraph',
        text: 'Establishing an information architecture is a fluid task that informs the entire software development life cycle at THOR. We infuse our design and technology decisions with architecture that supports business objectives, design goals, and technology tools. The process is always custom and can take on various meanings depending on the nature of the work at hand.',
        lead: true,
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'The shape of data',
      },
      {
        type: 'paragraph',
        text: 'On medium and large scale development efforts, the role of deciding how to structure data is a hidden task that some non-technical teams overlook. You can think of data architecture (or its technical name, schema) as the foundational layer of a quality website. Despite popular belief, determining how to structure information doesn’t have to be a daunting process. It’s something you can tackle as a team even before engaging a professional studio like THOR.',
      },
      {
        type: 'paragraph',
        text: 'As a matter of fact, establishing a schema is a process we encourage our clients to begin before engaging with us to help you get the most out of the transformation that follows. We suggest completing this exercise by identifying content that is working on the site, content that feels stale, and content that is missing. Part of the discovery process that will follow this initial effort builds upon these findings and involves a deep site audit that picks up where your advance exercise leaves off. Taken together, the process catalogs the entire site and informs our team at THOR in regards to content that should be migrated and content that should be left behind.',
      },
      {
        type: 'paragraph',
        text: 'In our analysis we look at sites in modular segments and pinpoint where disparate content types overlap and how others may be reusable in the future. THOR develops data models that steer our design and development work that results in flat information hierarchies that link elements to create varied views of a site’s content.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Wireframing a site',
      },
      {
        type: 'paragraph',
        text: 'A wireframe is a basic diagram showing the position of modular elements that form each page of a website. By generating a wireframe and agreeing to its structure with our clients, we are able to begin the design process with a foundation for our user experience that is sensible and accounts for all of the content we’ve identified in the early architecture phase.',
      },
      {
        type: 'quote',
        text: '“This is the 30,000-foot view of the site: an expansive look at a moment when adjustments can still be made without budgetary ramifications.”',
      },
      {
        type: 'paragraph',
        text: 'At this point in the process, architecture, wireframing, and design begin to blend as we advance into the specific aesthetics of the site. We approach this task with a combination of knowledge gathered over years of experience and an ongoing review of current design inspiration and aspirational sites identified by both our internal team and the client. The resulting wireframe creates the first glimpse of the overall roadmap to a complete site.',
      },
      {
        type: 'heading',
        id: 'a-3',
        text: 'Framing a website',
      },
      {
        type: 'paragraph',
        text: 'In tandem with the design process on any given project our development team will build the data models established in the architecture phased into the chosen CMS or database platform. We start this process by manually migrating representative content items into these new models to test how well our assumptions play out in a live setting. We use feedback from these trials to fine tune our efforts and iterate on this process until we obtain the results we seek.',
      },
      {
        type: 'paragraph',
        text: 'This process of confirming our assumptions, validating our technical direction, and collaborating with the client to verify the project direction is critical to the development process. It allows us to move forward consistently and confidently with the knowledge that the systems we have in place are sound.',
      },
      {
        type: 'paragraph',
        text: 'During this early phase, and while our design and development team are both up and running on their respective tasks, we also begin training our clients to work with their site. We have you begin to explore the CMS to build early confidence and familiarity with the platform chosen for a project. This involves logging in, adjusting content, exploring the dashboard, and witnessing how actions in the backend of the site affect the front end.',
      },
      {
        type: 'paragraph',
        text: 'In some instances, depending on the scope of a project and the outcome of our test content, THOR may outline a more extensive migration plan which features a mix of manual and scripted migration into the new platform of choice.',
      },
      {
        type: 'callout',
        title: 'Scheduling and cost',
        text: 'Architecture can be thought of as the ‘glue’ in the life of a project: It fuses together many of the development phases yet does not stand alone. As such, it’s hard to scope this type of work outside of a full website build in which THOR will add architecture into our design and development deliverables. We encourage interested parties to explore our Website 101 explainer series, where we guide clients through our varied offerings. Our CMS, Headless, and Custom website builds all feature architecture as part of the process. If you have questions about how architecture tasks work at THOR, reach out and we’d be happy to start a conversation with you.',
        contact: true,
      },
    ],
  },
  {
    slug: 'project-management',
    status: 'ready',
    lede: 'It’s possible to create a project workflow while you’re in the middle of the project. It’s also possible to assemble a parachute while you’re plummeting to the earth. But in both cases, it’s extremely stressful. Let’s alleviate that stress and talk about project management BEFORE we get to work.',
    sections: [
      {
        type: 'paragraph',
        text: 'Guiding a technical project to the finish line is an art and a science. Complex deliverables require careful vetting and flexible implementation guidelines to maintain steady progress. Over the course of hundreds of projects we have developed a collection of preferred tools and workflow patterns that assure our projects stay on time and on budget.',
        lead: true,
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'Setup for success',
      },
      {
        type: 'paragraph',
        text: 'When projects begin, clients naturally have high expectations about the finished product. During the initial phase of any project, THOR will provide baseline understanding regarding the overall workflow. For nearly every project we take on we utilize what is known as an agile process. The agile process is a way to structure projects around iterative, continuous delivery. The initial concept of this method was born from the failures of traditional sequential (waterfall) delivery methods for software projects.',
      },
      {
        type: 'paragraph',
        text: 'In the traditional waterfall system, as projects scale, the finish line becomes increasingly distant. Waterfall projects stall from the beginning with cumbersome requirements gathering— essentially a blueprint for how everything works. When a project grows in size and/or complexity, the requirements gathering can take so long that completed tasks evolve and must be revisited. This process can repeat throughout a project, necessitating slow downs, restarts, and duplicated effort.',
      },
      {
        type: 'paragraph',
        text: 'THOR’s agile management process turns this on its head. We break projects into individual units called sprints which are completed in two or three week blocks of work. This schedule forms the cornerstone of agile thinking. Each sprint is self-contained with predefined tasks that must be ready for implementation before beginning.',
      },
      {
        type: 'quote',
        text: '“Successful delivery becomes a feature-by-feature march to the finish line, rather than monolithic phases that easily derail.”',
      },
      {
        type: 'paragraph',
        text: 'This method helps manage complexity by concentrating efforts solely on the task at hand, rather than wrestling with the full scope of a project at all times.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Tools to guide the process',
      },
      {
        type: 'paragraph',
        text: 'THOR works collaboratively with our clients, setting both long term vision and sprint-based goals throughout our projects. We have tried many tools and agree that Trello is our preferred way to manage the bird’s eye view of the project lifecycle. Trello is particularly effective given that its card- and list-based structure can be molded to work with different kinds of projects.',
      },
      {
        type: 'paragraph',
        text: 'For small scale projects, team members can easily refer to a Trello board dedicated to tracking the implementation tasks for each phase. As projects grow, Trello becomes a slightly less effective task manager but remains a great way to chronicle the long-term vision of an organization and prioritize goals in a collaborative way with client teams. In medium and large scale projects we leverage Github and their milestones and issues system to set up our sprint planning tasks. Github is an especially great tool for this job because the management side of the product natively integrates with its better known code repository and deployment capabilities. Taken together, they represent a coherent way to manage software development and to keep all parties updated with real-time progress.',
      },
      {
        type: 'heading',
        id: 'a-3',
        text: 'Iterative thinking',
      },
      {
        type: 'paragraph',
        text: 'THOR uses this agile process to guide our work as much for ourselves as for our clients. Great websites are a work in progress in which evolution is the only constant. Using the tools and processes outlined above, clients can strategically envision how to best leverage their investment.',
      },
      {
        type: 'paragraph',
        text: 'Agile projects represent a continuous process and for that reason don’t have a set end point. A well kept Trello vision board stays on top of quarterly updates and allows for rapid project status checks. This project management infrastructure helps our clients concentrate on refining their business objectives, rather than wondering where things stand.',
      },
      {
        type: 'callout',
        title: 'Scheduling and cost',
        text: 'Project management is a constant in all projects here at THOR. The degree to which we formalize this process with line item costs correlates with the scale of the project. Small and medium scale work has smaller management overhead so we often itemize line item costs with that scale of work. As projects grow in sophistication, THOR recommends maintenance schedules delivered on a quarterly basis that keep all parties aligned and websites secured. These can range from smaller scale engagements that keep a site humming along or they can be focused on iterative feature development that builds on the success of our previous work. Structured maintenance agreements vary in price but usually land somewhere between $5000 and $15000 per quarter. We can also augment teams on a semi-permanent basis. Those costs are individually tailored to the needs of a particular client. We encourage interested parties to explore our Website 101 explainer series, where we guide clients through our offerings. All website builds feature project management as part of the process. We provide price recommendations for quarterly maintenance separately. If you have more detailed questions about how we manage projects here at THOR, reach out and we’d be happy to start a conversation with you.',
        contact: true,
      },
    ],
  },
  {
    slug: 'design-and-development',
    status: 'ready',
    lede: 'Marrying content, design, accessibility and performance into a compelling package while staying on budget requires a seasoned team with deep experience. Read how THOR gets the job done.',
    sections: [
      {
        type: 'paragraph',
        text: 'Bringing a great website to market is not an easy task. Below, we’ve laid out some highlights of how THOR brings design and development together to create digital experiences for all kinds of organizations.',
        lead: true,
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'Interwoven disciplines',
      },
      {
        type: 'paragraph',
        text: 'At THOR, our web process is highly collaborative, with our clients and our internal team members. We don’t have firm cutoff points between phases in the project lifecycle but rather task categories that ebb and flow depending on the demands of the deliverable. For example, discovery work tends to be the most demanding during the initial sprints of a project but we will frequently circle back to the findings, or perform additional due diligence and research as a task requires it.',
      },
      {
        type: 'paragraph',
        text: 'Similarly, design and development are twinned into a single process where one element educates how the other is completed. We favor extensively sharing design directions with our clients and getting feedback that informs but doesn’t dictate what happens in development. THOR leans on its interdisciplinary team to solve business problems, not handcuff each other into designs that can’t be built or technical implementations that have poor usability.',
      },
      {
        type: 'quote',
        text: '“Design and development are twinned into a single process where one element educates how the other is completed.”',
      },
      {
        type: 'paragraph',
        text: 'The result are websites that balance the needs of end users with compelling design, best-in-class technical solutions at price points that respect our client’s budgets.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Deciphering development',
      },
      {
        type: 'paragraph',
        text: 'Even with a collaborative process, technical deliverables can be complex to understand. Our process is open and collaborative and the exchange between our teams is something we set up according to the preferences of our clientele.',
      },
      {
        type: 'paragraph',
        text: 'THOR strives to explain what we’re building, suggesting the best tools and processes and layering a clean design aesthetic on top of all the technology under the hood. Some clients prefer to join in the process, shaping the work as it happens and making certain technical decisions.',
      },
      {
        type: 'paragraph',
        text: 'Other teams like to focus primarily on content tasks and evaluate web deliverables once they are fully functional, leaving the implementation detail up to our team. Still others look to THOR to help augment their teams capabilities, seeing us as teammates rather than contractors who can fill certain roles their teams are missing.',
      },
      {
        type: 'paragraph',
        text: 'We fill all these roles depending on the project and at THOR, our preference is to work with your team from inception to completion of a technical project, learning how your team operates and figuring out ways to enhance their capabilities. This helps us deliver the best results.',
      },
      {
        type: 'heading',
        id: 'a-3',
        text: 'Iterating on success',
      },
      {
        type: 'paragraph',
        text: 'The ability to deliver a quality website requires iterative progress that builds on each success. It’s much easier to see a complex web project as a series of sprints inside of a statement of work, rather than a monolithic deliverable that goes live at a given date. This gives our clients the ability to evaluate the work as it comes to life. This also greatly assists when change management is an unofficial yet essential part of the project.',
      },
      {
        type: 'paragraph',
        text: 'Quality development teams like THOR are continually evaluating the web development world to see if there are better ways to improve what we’re building, even while we’re building it! We lean on our clients to set the direction for their business initiatives. Together, we can collectively iterate through a business objective by utilizing great tools, perfecting the solution in real time.',
      },
      {
        type: 'paragraph',
        text: 'This style of software development is often referred to as an agile process. At THOR, we utilize many of the tenets of agile— sprint planning, issue backlogs and maintenance deliverables are all baked into what we do. The core understanding to take away from agile work is not the micro managerial steps but the iterative approach to building large-scale digital projects. That is central to our process and why we’ve been able to deliver so many great products for our clients through the years.',
      },
      {
        type: 'callout',
        title: 'Scheduling and budgeting for this work',
        text: 'THOR offers a vast scale of design and development services. Before building a website, it makes sense to know what kind of website you are really looking for. We have distilled a selection of them into our Website 101 to help guide you through the many different options. If it’s easier, just reach out to team THOR and we are happy to schedule a one-on-one consultation to see if it makes sense for us to work together.',
        contact: true,
      },
    ],
  },
  {
    slug: 'publication-redesign',
    status: 'ready',
    lede: 'The purpose of publication redesign is not only to improve the look of the magazine and to correct existing technical problems, but also to make 75% of the design decisions up front.',
    sections: [
      {
        type: 'paragraph',
        text: 'Format, color, typography, styles — these decisions will be addressed during the redesign. This takes the burden off of the ongoing production process and allows the designer of the magazine to invest time in image selection, illustrations, charts/graphs and design concepts that make each issue unique and appropriate to the subject matter.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'At its simplest, our goal in publication design is to strike a balance between stunning visual elements and clear communication, both crucial qualities when designing stories for a niche market. Our designers read and understand each story in order to select the highest quality images to illustrate concepts, to create intuitive designs that make navigating the magazine second nature, and to constantly develop innovative ways to add interest to the written aspects of the magazine.',
      },
      {
        type: 'paragraph',
        text: 'Our style is based on strong elements featuring bold color and high contrast. In the current arena of communications there are a lot of messages competing for a reader’s attention and it is our job to garner that attention through design. In addition to vibrant visual choices we focus our attention on the overall structure of the magazine.',
      },
      {
        type: 'quote',
        text: '“Two often missed aspects of print design are scale and pacing.”',
      },
      {
        type: 'paragraph',
        text: 'The visual hierarchy of a printed page is critical to a reader’s instinctive understanding of the content before them, and the visual hierarchy of the overall magazine is critical to understanding how articles relate to one another. It is our job as designers to organize elements in such a way that readers instantly relate to the content.',
      },
      {
        type: 'paragraph',
        text: 'We also help to develop entry points within the magazine. Pull quotes, sidebars, factoids, and crossover elements (content that link readers from print to web or vice versa)—these are all elements we develop and deploy. The design process will take into consideration the physical production of the magazine including the size of the magazine, the stock it is printed on, and additional print techniques that will enhance the appearance.',
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'Redesign process',
      },
      {
        type: 'paragraph',
        text: 'Our redesign process breaks down to a series of five stages:',
      },
      {
        type: 'subheading',
        id: 'discovery',
        text: 'Discovery',
      },
      {
        type: 'paragraph',
        text: 'THOR leads an intake session with the editorial team to gather intelligence surrounding requirements, goals, and general preferences for the project. We look at aspirational magazines from which we can glean general ideas for an aesthetic. We also discuss competitors and trends to search for ways to best appeal to readers. The end result is a focused set of goals for the redesign and an understanding of the overall design vision for the magazine.',
      },
      {
        type: 'subheading',
        id: 'preliminary-design',
        text: 'Preliminary Design',
      },
      {
        type: 'paragraph',
        text: 'We produce a set of visual design samples based upon our Discovery findings. Included within these comps are typically:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Magazine cover; new nameplate (logo), new placement of elements, consideration of new photography or illustration style, strategic upgrades to promote overall reader engagement.',
          'Department and Features; new layouts based on updated use of the document grid. Pacing is a key focus of this effort and creating a connected but distinct appearance for features/departments is at the top of the list.',
          'Typography; we examine and make suggestions for new typography throughout the magazine with a focus on high readability and a modern appearance appropriate to the subject matter.',
          'Entry points; new elements are added throughout the magazine to create greater reader engagement. Methods for creating connections between the print edition, online content, and promotional materials are examined.',
          'Architecture: We present an overall assessment of the magazine structure with a focus on content organization that appeals to readers. This phase includes a collaboration with the editors to discuss adjustments to content.',
        ],
      },
      {
        type: 'subheading',
        id: 'refine-design',
        text: 'Refine Design',
      },
      {
        type: 'paragraph',
        text: 'After the editorial team has reviewed the initial designs and provided feedback, we begin to refine the designs until they are considered final. This occurs over a series of 2-3 revision rounds.',
      },
      {
        type: 'subheading',
        id: 'expand-design',
        text: 'Expand Design',
      },
      {
        type: 'paragraph',
        text: 'At the end of the refining rounds, we have a clear sense of the overall design of the new publication. At this time we apply the approved design to all remaining aspects of the magazine and develop the necessary templates to build a complete issue of the publication on an ongoing basis.',
      },
      {
        type: 'subheading',
        id: 'implementation',
        text: 'Implementation',
      },
      {
        type: 'paragraph',
        text: 'We use material from a real issue of the publication to test our work ahead of introducing the new design into the production schedule. We use this time to refine the small details of the design and reflect those changes in the templates, including ad placements for magazines that accept advertising. And a better designed magazine drives more advertising revenue.',
      },
      {
        type: 'callout',
        title: 'Let’s talk',
        text: 'Contact us to discuss your magazine. Even if it’s a shambles, we can fix it.',
        contact: true,
      },
    ],
  },
  {
    slug: 'publication-pacing',
    status: 'ready',
    lede: 'If you like things that are boring, disorganized, and uninspired, then magazines without pacing are right up your alley.',
    sections: [
      {
        type: 'paragraph',
        text: 'One of the key concepts of publication design — whether we’re talking about print or digital — is pacing. Pacing is the rhythm of design. It’s the pattern within a layout that breathes life into the process of reading and enjoying content. It’s the set of visual cues that reach readers deep in their subconscious and trigger their expectations of the information they are about to read.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'The easiest way to remove all of the joy from a publication is to remove the waypoints of pacing. Boring publications have medium size everything. Medium length articles. Medium size headlines. Medium size images. Medium, medium, medium.',
      },
      {
        type: 'quote',
        text: '“Nothing turns a publication into a dreary report more quickly than making everything medium.”',
      },
      {
        type: 'paragraph',
        text: 'As you might have guessed, pacing uses scale to set the tempo. Typically this is done by setting a pattern utilizing short stories with small treatments at the beginning and end of a publication and long stories with grand treatments at the center. This creates a wave of sorts, with a peak at the center. It forms a welcoming introduction, a “grab a cup of coffee and get comfortable” centerpiece of features, and a short, sweet, and often utilitarian exit. Not that there are rules. The layout can be shifted in any number of ways to alter the pace. The importance is that there is a pace, and that it is distinct and purposeful and reflects the desired readership.',
      },
      {
        type: 'paragraph',
        text: 'The publications we design at THOR adhere to this concept. All of our redesigns start with this focus on pacing. We avoid medium and embrace the bold and distinct energy derived from well executed pacing.',
      },
      {
        type: 'callout',
        title: 'See it in practice',
        text: 'Visit our case studies to see examples of this concept in practice, or contact us to discuss your project.',
        contact: true,
        link: {
          href: '/case-studies',
          label: 'Explore case studies',
        },
      },
    ],
  },
  {
    slug: 'ongoing-publication-design',
    status: 'ready',
    lede: 'At its simplest, our goal in publication design is to strike a balance between stunning visual elements and clear communication.',
    sections: [
      {
        type: 'paragraph',
        text: 'In designing stories for a niche market both of these qualities are critical. Our designers read and understand each story in order to select the highest quality images to illustrate concepts, to create intuitive designs that make navigating the magazine second nature, and to constantly develop innovative ways to add interest to the written aspects of the magazine.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Our style is based on strong elements featuring bold color and high contrast. In the current arena of communications there are a lot of messages competing for a reader’s attention and it is our job to garner that attention through design. In addition to vibrant visual choices we focus our attention on the overall structure of the magazine. Two often missed aspects of print design are scale and pacing. The visual hierarchy of a printed page is critical to a reader’s instinctive understanding of the content before them, and the visual hierarchy of the overall magazine is critical to understanding how articles relate to one another. It is our job as designers to organize elements in such a way that readers instantly relate to the content.',
      },
      {
        type: 'quote',
        text: '“Adhering to deadlines is critical when keeping up with the unrelenting pace of a magazine.”',
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'How an issue comes together',
      },
      {
        type: 'subheading',
        id: 'project-planning',
        text: 'Project Planning',
      },
      {
        type: 'paragraph',
        text: 'Adhering to deadlines is critical when keeping up with the unrelenting pace of a magazine. We begin by reviewing the schedule for the issue taking into consideration the target delivery date for the issue and any holidays or special editorial requests. At this same time we review the ad sales report and the first drafts of all stories to provide an imposition for the issue showing the printer’s layout of pages. The schedule and flat plan are agreed upon by THOR and the editor prior to the beginning of the design phase. This process sets the foundation for our work on the issue.',
      },
      {
        type: 'subheading',
        id: 'image-selection',
        text: 'Image Selection',
      },
      {
        type: 'paragraph',
        text: 'The first creative task of the project is the sourcing of images. For established clients, we understand there will be a combination of author-provided images and sourced stock images. Our goal is finding the visual balance between conceptual and utilitarian artwork. We are highly skilled at creating custom artwork, from conceptual covers and feature leads to infographics and illustrated charts. This is an area that can truly set a publication apart from its competition.',
      },
      {
        type: 'subheading',
        id: 'design',
        text: 'Design',
      },
      {
        type: 'paragraph',
        text: 'With all of the magazine content in hand, we prepare the first draft of the magazine. Our process is customized to meet the needs of our clients. Some clients prefer that we work on individual sections of the magazine and route individual proofs for each section, some prefer that we design the magazine as a whole and route a single proof. Either is acceptable to us and we can help to make the determination of which option is best.',
      },
      {
        type: 'subheading',
        id: 'edits',
        text: 'Edits',
      },
      {
        type: 'paragraph',
        text: 'We are extremely detail-oriented and have a great deal of experience completing edits and updates provided to us by our clients. We are able to handle these edits on your behalf from notes provided to us using marked up PDFs. We also have experience working with clients who prefer an InDesign/InCopy workflow in which the client applies edits to InCopy and we adjust as needed within InDesign.',
      },
      {
        type: 'subheading',
        id: 'printer-delivery',
        text: 'Printer Delivery',
      },
      {
        type: 'paragraph',
        text: 'With years of experience working with a wide range of publications, we are also extremely well versed in preparing files that are ready for print production. We handle all of the pre-flight and delivery requirements for each issue. We are available to be a part of the printer approval process to whatever degree is requested. Typically we review digital proofs and provide commentary and updates as needed.',
      },
      {
        type: 'paragraph',
        text: 'For workflow needs we use the project management software Trello. This software allows us to move away from an email-based system of exchanges to a permanent record of content, comments, and task progress that is clear and transparent to all members of the production team. We’ve found this process to be extremely intuitive and effective in managing all of the individual elements of a given issue.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Project outline',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Design and layout of the magazine using approved templates',
          'Approximately three cover options each issue',
          'Approximately three rounds of edits to complete issue',
          'Ad placements in layout',
          'Crop and improve resolution, color, in images provided',
          'Perform stock photo research for additional needs',
          'Convert data from provided charts, graphs, etc. to make suitable for the design',
          'Create electronic output of final approved files for print production',
          'Provide PDF of complete issue',
          'Support online efforts',
        ],
      },
    ],
  },
  {
    slug: 'the-rapidly-evolving-web',
    status: 'ready',
    lede: 'The world-wide web is constantly evolving along with the websites that compose it. This article provides a quick digest of the most common types of sites and how they can meet the needs of your organization.',
    sections: [
      {
        type: 'paragraph',
        text: 'At its most basic, a website is a collection of webpages that are served over a network. Each website is housed on a decentralized network of servers that share a common communication standard called the world wide web. Websites are the most visible part of the global network we call the internet.',
        lead: true,
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'Different types of websites and how they can work for you',
      },
      {
        type: 'paragraph',
        text: 'When considering a new website, having a sense of the digital landscape will make you a savvy consumer. Websites come in a lot of different shapes and sizes, with four broad categories to consider:',
      },
      {
        type: 'subheading',
        id: 'no-code-websites',
        text: 'No-code websites',
      },
      {
        type: 'paragraph',
        text: 'This is the most basic class of websites that is true to its name: Individuals can create an account with one of the no-code providers and have a template-based website online in the course of an afternoon without writing a single line of code. The advantage of this approach includes the quick time to market. The disadvantage is the sacrifice of customization. This type of solution pairs well with campaign-driven projects that have a short shelf-life and tight deadlines. Learn more about No-code Websites.',
      },
      {
        type: 'subheading',
        id: 'cms-websites',
        text: 'CMS websites',
      },
      {
        type: 'paragraph',
        text: 'Any website with a content management system, or CMS, is included in this group. You can think of a CMS as a user-friendly database that stores and retrieves webpage content. Their hallmark has historically been monolithic design that bundles such features as search, user accounts, authentication, e-commerce and a convenient theme layer in an all-in-one solution. This category of sites can be great for corporate identities, media properties and general purpose information sites without a lot of interactivity. These sites take technical expertise to set up and manage but reduce maintenance costs in the long term. Learn more about CMS Websites.',
      },
      {
        type: 'subheading',
        id: 'headless-cms-websites',
        text: 'Headless CMS websites',
      },
      {
        type: 'paragraph',
        text: 'Some CMS tools have increasingly become more focused on their core function as content databases. In doing so they have removed secondary features including, in many instances, the interface portion of the application. This effectively makes these solutions ‘headless’. At first this may appear counterintuitive — how could a website not have a user interface? The answer is that these cutting-edge solutions embrace the concept of software-as-a-service, often called SaaS. Whereas traditional CMS websites bundle a collection of tools in a single package, headless options allow you to select a constellation of services that meet your project’s specific needs. The constellation is connected by a custom user-interface. While these projects require more development effort up front they typically deliver better results by using the best tool for each aspect of the site. Learn more about Headless CMS Websites.',
      },
      {
        type: 'subheading',
        id: 'custom-websites',
        text: 'Custom websites',
      },
      {
        type: 'paragraph',
        text: 'Custom experiences are typically paired with clients needing to build full applications. Startups, expansive government sites, and some corporate products need fully custom solutions. These sites are complicated to construct, take more effort to maintain, require extensive research upfront, and demand white glove product management to execute. Only experienced teams with clear expectations should pursue fully custom websites. Learn more about Custom Websites.',
      },
      {
        type: 'quote',
        text: '“Having a sense of the digital landscape will make you a savvy consumer.”',
      },
      {
        type: 'callout',
        title: 'See it in practice',
        text: 'View our portfolio to read case studies that examine this type of development.',
        contact: false,
        link: {
          href: '/case-studies',
          label: 'Explore case studies',
        },
      },
    ],
  },
  {
    slug: 'no-code-websites',
    status: 'ready',
    lede: 'No-code website platforms have finally reached maturity and the results are awesome. Much like a frozen pizza, no-code sites are an excellent solution when quick turn-around and affordability are top priorities.',
    sections: [
      {
        type: 'paragraph',
        text: 'Because of their ease of use, no-code development tools have exploded in popularity over the last five years. The underlying concept is alluring: an individual with no knowledge of coding can quickly build a website. To a certain degree that sales pitch is true. Almost anyone with baseline knowledge of the internet can assemble a site. But as we will read later, there are certain skills that can’t be automated that make a big difference in the performance of your site.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'The key selling point of no-code sites is that much of the design and development work is done for you. A user simply selects from a provider’s templates, plugs in content, and the site comes to life.',
      },
      {
        type: 'paragraph',
        text: 'Another key feature of many no-code platforms is the inclusion of hosting. This class of website tools are referred to as SaaS (Software-as-a-service) which are native to the cloud. This allows the site to go live immediately after it is constructed and a domain name is chosen.',
      },
      {
        type: 'paragraph',
        text: 'However, the biggest drawback is that most individuals who start building a website with these tools don’t know how to structure their content or, don’t have content. Many don’t have the design touch that makes a great website stand out. And many don’t have the time or patience to truly leverage all of the tools available to them within the no-code platform.',
      },
      {
        type: 'quote',
        text: '“It isn’t uncommon for inexperienced users of these tools to begin with a well conceived template only to have the design degrade as they populate it.”',
      },
      {
        type: 'paragraph',
        text: 'That’s where THOR can help. But first, here’s a rundown of some of the basics.',
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'Some of the providers and our thoughts',
      },
      {
        type: 'subheading',
        id: 'webflow',
        text: 'Webflow',
      },
      {
        type: 'paragraph',
        text: 'The newest of the no-code platforms, Webflow, is the favored no-code platform of the THOR team. It delves several levels deeper into the development process than other tools giving users full control over styles and layout. It even provides a basic content management system (CMS) that elevates the capabilities of the platform immensely.',
      },
      {
        type: 'paragraph',
        text: 'Upside: Customization is what sets them apart. Webflow strikes an outstanding balance between out of the box sites that often provide a cookie-cutter outcome and custom CMS-driven sites that are complex and costly to build.',
      },
      {
        type: 'paragraph',
        text: 'Downside: It has the steepest learning curve.',
      },
      {
        type: 'subheading',
        id: 'squarespace',
        text: 'Squarespace',
      },
      {
        type: 'paragraph',
        text: 'Squarespace’s website builder is one of the original no-code providers and is known for a particular modular approach that results in a clean and polished aesthetic.',
      },
      {
        type: 'paragraph',
        text: 'Upside: They are known for providing high design templates that deliver modern design for a great price.',
      },
      {
        type: 'paragraph',
        text: 'Downside: Their offering is rigid and hard to customize.',
      },
      {
        type: 'subheading',
        id: 'wix',
        text: 'Wix',
      },
      {
        type: 'paragraph',
        text: 'This company has typically been at the back of the pack of the no-code world. They’ve recently upgraded by mimicking much of Squarespace’s design aesthetic.',
      },
      {
        type: 'paragraph',
        text: 'Upside: Recently revamped aesthetic.',
      },
      {
        type: 'paragraph',
        text: 'Downside: Clunky design and a questionable management interface.',
      },
      {
        type: 'subheading',
        id: 'shopify',
        text: 'Shopify',
      },
      {
        type: 'paragraph',
        text: 'This company has been around for ages but came into their own during the pandemic. They are the go-to source for individuals trying to stand up a digital business with a lean budget.',
      },
      {
        type: 'paragraph',
        text: 'Upside: They are the established leader in affordable ecommerce sites.',
      },
      {
        type: 'paragraph',
        text: 'Downside: The platform can be cumbersome to customize.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Basic budgeting for a no-code website',
      },
      {
        type: 'paragraph',
        text: 'The base-level price points for accessing these platforms are incredibly affordable. Most providers have a basic tier of service that starts at $20-30/mo and scales with your ambitions. The top tier pricing generally stays under $300/mo.',
      },
      {
        type: 'paragraph',
        text: 'Webflow has a slightly confusing pricing system that breaks its fees into a ‘designer’ charge and a ‘hosting’ charge. Squarespace and Wix are more straightforward with a single bundled cost. Shopify has a much larger price range, starting around $50/mo and increasing up to tens of thousands of dollars with their Plus offering that grows in step with the amount of ecommerce business being conducted.',
      },
      {
        type: 'heading',
        id: 'a-3',
        text: 'Our services in the no-code world',
      },
      {
        type: 'paragraph',
        text: 'While no-code tools provide the basic building blocks of site construction by bundling web hosting, design, and development into a single package, the need for professional content, graphics, and development customization is still a key component of successful site creation. THOR has worked with many clients to build sites with Webflow. These engagements generally land in the $20-30K price zone depending on the available assets and the integrations that are required. Our team can walk you through the process of establishing a site within the system, generating a plan of action for developing and assembling content, constructing a sensible site architecture, integrating often overlooked backend infrastructure such as SEO and analytics, and executing the design and deployment of the site at the web’s highest standard.',
      },
      {
        type: 'callout',
        title: 'How to get started',
        text: 'Contact us to talk through the options, implications, and the methods we employ to make your no-code site a reality. We’re available to walk you through the platforms and discuss the specific details of your project and how it aligns with the no-code tools we’ve outlined in this article.',
        contact: true,
      },
    ],
  },
  {
    slug: 'custom-websites',
    status: 'ready',
    lede: 'Like a perfectly tailored suit, a custom website can be the exact fit for your project. Unless everyone else at the party is wearing flip flops and Hawaiian shirts. Then you’re just overdressed and no one will talk to you. Let’s learn about the benefits and limitations of custom sites.',
    sections: [
      {
        type: 'paragraph',
        text: 'To many organizations pursuing a website redesign, all websites are considered custom websites. However, if you investigate this space more deeply, you’ll find that custom is a term that takes on additional meaning within the tech industry.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'The vast majority of websites rely on someone else to do the heavy lifting of creating the actual application that forms the basis of the site. And for good reason; it’s not economical to maintain custom software for most organizations. If you’ve read our reviews of CMS and Headless websites, both of those solutions essentially outsource the intensive step of creating the base application. In those instances, the organization simply chooses a pre-built platform and contracts with a firm like THOR to weave everything together with a great user experience.',
      },
      {
        type: 'paragraph',
        text: 'Custom websites, on the other hand, don’t rely on any content management or predetermined solutions. Instead, they require a development team to build the entire application by setting up a database, managing users, securing the application, building a search experience, putting together a pleasant interface, and more. In some instances, every aspect of the site is created from scratch in an effort to truly align the platform with the needs of the site. In other cases, custom websites can borrow from the headless approach by utilizing software-as-a-service (SaaS) solutions. Sites of this sort blur the line between purely custom solutions and headless solutions.',
      },
      {
        type: 'paragraph',
        text: 'The most obvious advantage of this approach is that an organization gets exactly what they want. However, this bold approach can present a double edge sword. Custom websites can be risky projects. Many developers attempting to build a custom site aren’t technically oriented and can quickly find themselves in over their heads, faced with deeply technical puzzles they aren’t prepared to solve. In addition, the prices for these projects tend to be very high, with long term maintenance overhead. For these reasons it’s almost always the wrong answer to build from scratch. But never say never. There are a couple use cases in which it makes sense.',
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'When to go custom',
      },
      {
        type: 'paragraph',
        text: 'If there’s one test for determining whether or not to go custom it’s to ask yourself: Will your users create more of your site’s content than you will? Custom sites tend to feel more like applications than typical page-based web experiences where consumption is the focus. The big social sites YouTube, Twitter and Facebook leverage this idea. Newer web-native applications like Figma, Notion, and Airtable take it a step further by putting desktop-like interactivity in the browser.',
      },
      {
        type: 'quote',
        text: '“Will your users create more of your site’s content than you will?”',
      },
      {
        type: 'paragraph',
        text: 'When considering building something of this scale, there are conversations every team should be having:',
      },
      {
        type: 'subheading',
        id: 'product-market-fit',
        text: 'Product market fit',
      },
      {
        type: 'paragraph',
        text: 'This concept comes from the world of startups but the idea makes sense for any custom website project. Ask yourself: Have we figured out a way to present our product (concept) so that people are interested in buying it (consuming it)—and can you prove it with sales (metrics)? If you haven’t figured that out, it likely makes far more sense to concentrate on sales or a conceptual website that validates the idea before allocating serious capital into building one from scratch.',
      },
      {
        type: 'subheading',
        id: 'technical-debt',
        text: 'Technical debt',
      },
      {
        type: 'paragraph',
        text: 'This is a fancy word for maintenance but it’s important to understand the nuance. Regular CMS / Headless websites have maintenance cycles that merely upgrade the core components, with only minor refactoring of the custom code that sits on top. When you build an application from scratch, each aspect of the application requires maintenance. And if the application is built without an eye for the future, this becomes a substantial stumbling block defined as a technical debt that your organization will forever be paying down. One simple principle to follow is to be careful regarding how many features you ask for. Make sure you need them or consider outsourcing them to a SaaS solution.',
      },
      {
        type: 'subheading',
        id: 'iteration',
        text: 'Iteration',
      },
      {
        type: 'paragraph',
        text: 'With a consumption-based, page-oriented website, evolving the site through an iterative process is a well known best practice. In a traditional cycle such as this the process typically has an endpoint after which there may be long periods without development. With a custom application, iteration continues for the life of the application, whether it is desired or not. Market dynamics and technical decisions force the hand of site owners to evolve constantly. For this reason, budgeting for a custom website project requires you to think of duration in years, not weeks and months.',
      },
      {
        type: 'paragraph',
        text: 'Even if you’ve resolved all of those questions listed above a custom website still might feel too risky an endeavor. THOR always recommends that our clients evaluate how much of the concept is really custom and whether it could be adequately handled by the broad universe of SaaS solutions. It’s more than likely that you will be able fit your concept into a constellation of services rather than a completely custom build. The following section outlines some of our favorite SaaS-based technical solutions which avoid a lot of the prickly parts of building a custom app.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Technologies to consider',
      },
      {
        type: 'paragraph',
        text: 'One of the most important technical decisions custom website builds have to wrestle with is what tools they will use to build the site. With traditional CMS websites, those decisions are made for you by the platform. Custom websites require picking all of those items. THOR has some recommendations for what you should be looking for with the caveat that this space is vast and almost every vendor will have different preferences:',
      },
      {
        type: 'subheading',
        id: 'data-hasura',
        text: 'Data: Hasura',
      },
      {
        type: 'paragraph',
        text: 'A GraphQL server with a Postgres relational DB. The biggest database decision you’ll face is what type to use. There are many kinds but the most common is probably the right answer: a relational (SQL) database. Postgres is the best in class solution. If you can think through your data model as columns on a spreadsheet and see where each data entry is a row that fills in a column, that mental image maps very closely to how a relational DB works. Hasura simplifies a lot of decisions for would-be custom site builders by hosting the Postgresql database and wrapping an easily customizable GraphQL server around it. You may also hear about NoSQL databases (specifically MongoDB and their Atlas product, which is similar to Hasura). That type of structure makes querying for information difficult and THOR does not recommend it.',
      },
      {
        type: 'subheading',
        id: 'back-end-cloudflare-workers',
        text: 'Back-end: Cloudflare Workers',
      },
      {
        type: 'paragraph',
        text: 'Serverless functions that work only when needed. It’s helpful to think of your new site like a restaurant, with the backend acting like a waiter relaying requests from the users of your website to the database in the kitchen. The business logic of an application is what lives in the backend of your website. Think of it as the recipes and the chef who creates the dishes for your patrons. THOR is a big fan of serverless functions, which take the backend of a custom application and spread it into separately hosted functions. The huge benefit of this approach is a simple maintenance model with lower hosting costs given that the functions are only used when needed. Cloudflare’s latest offering drops the cost and ups the speed of these functions to compete with any true backend, and positions them ahead of the more traditional AWS Lambda serverless offering.',
      },
      {
        type: 'subheading',
        id: 'front-end-next-js',
        text: 'Front-end: Next.js',
      },
      {
        type: 'paragraph',
        text: 'A React-based Javascript framework. The idea of Next.js is ingenious: It provides a component-based front-end architecture based on React that natively supports serverless Javascript functions, effectively fusing the front and backends of an application into one codebase. The framework itself allows developers to move quickly, using best-in-class React component-based interfaces and Node.js based serverless functions for interactive areas of the site. THOR has used Next with great success and highly recommends it for all types of projects, even Headless CMS work.',
      },
      {
        type: 'heading',
        id: 'a-3',
        text: 'OK, I really do want to go custom — how do I budget?',
      },
      {
        type: 'paragraph',
        text: 'If you’re still reading, and still are pursuing a custom solution - bravo. You must have a very intriguing project on your hands. THOR recommends an extensive discovery and architecture phase with every project but with a custom build these steps are absolutely essential. Discovery in this instance consists of interviews with internal stakeholders and the development of rich personas that reflect your customer base followed by interviews with those individuals. This process is required to determine if all project priorities are aligned and if product market fit is within reach.',
      },
      {
        type: 'paragraph',
        text: 'Architecture should be dual tracked to include design of reusable components that will work across your project’s lifespan and a deep, technical architecture phase that provides a birds-eye view of the tools the application can take advantage of.',
      },
      {
        type: 'paragraph',
        text: 'Discovery and architecture pricing typically falls in the $40-60K range. Expect the custom application to require at least 800-1000 hours to build. That puts budgets for this type of work well into the six-figures. It’s also a good idea to assume a healthy maintenance budget of approximately 20% of the original cost annually.',
      },
      {
        type: 'callout',
        title: 'How THOR can help',
        text: 'THOR offers its services in many different roles on projects like this. We are able to perform all activities and complete the full custom development of a site. In some cases, our expertise is best suited to augmenting your existing team to carry out the design and architecture phases of the project. If you are early in the evaluation process for a project of this sort, contact us to discuss ways in which we can customize solutions to work with your team and budget.',
        contact: true,
      },
    ],
  },
  {
    slug: 'cms-websites',
    status: 'ready',
    lede: 'CMS sites are among the most common of present day web platforms. They provide high levels of content organization and bundled features that simplify the process of standing up a new site.',
    sections: [
      {
        type: 'paragraph',
        text: 'When most organizations set out to redesign a website, they’re usually thinking of a content management system (CMS) and the webpages it displays. This solution has been the mainstay of the website industry for at least fifteen years, and there’s a good reason why.',
        lead: true,
      },
      {
        type: 'quote',
        text: '“You only have to make one decision—the selection of the CMS—and everything else basically falls into place.”',
      },
      {
        type: 'paragraph',
        text: 'The winning idea of a CMS is that you only have to make one decision— the selection of the CMS—and everything else basically falls into place. These solutions are technically called monoliths, and they package everything you need to make a website. Monoliths typically include:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Administrative back-ends, where content can be organized and indexed',
          'Databases, that format and programmatically store the content',
          'User management and roles, to organize who can access the content',
          'Search tools, for users to find what you’ve put online',
          'Pre-designed themes with variable range of quality',
        ],
      },
      {
        type: 'paragraph',
        text: 'If you’re looking for the greatest quantity of features for the lowest price, it’s hard to beat a traditional CMS. Features such as search, navigation menus, SEO, and even e-commerce are built into the basic package and work together seamlessly.',
      },
      {
        type: 'paragraph',
        text: 'The drawback is that these solutions often suffer from feature bloat and large amounts of technical debt (the implied cost of additional rework caused by choosing an easy solution early in the project). CMS sites often bundle features your project may not really need. Those features require maintenance whether they are in use or not. This exposes potential vectors for security breaches which are often exploited, especially in the common open-source CMS options.',
      },
      {
        type: 'paragraph',
        text: 'The price points for these solutions are highly variable, from free all the way up to tens of thousands of dollars per license. The cost of a CMS license is most often tied to the product support that is included over time.',
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'Some of the providers and our thoughts',
      },
      {
        type: 'subheading',
        id: 'wordpress',
        text: 'Wordpress',
      },
      {
        type: 'paragraph',
        text: 'This service is the original open-source content management system. Wordpress is still the largest and most widely used of any CMS. Its free acquisition price and wide developer community has brought customers in the door for decades and its plugin system is unmatched. Its codebase is wildly out of date compared with modern coding practices but developers have managed to bolt on modern features to keep the platform viable.',
      },
      {
        type: 'subheading',
        id: 'drupal',
        text: 'Drupal',
      },
      {
        type: 'paragraph',
        text: 'Drupal has largely been the second choice in open-source CMS options. It was originally far more groundbreaking, as it introduced the idea of modular, composable content. The ecosystem badly fractured around its v7 release in 2011 and has never quite recovered. Nevertheless, it remains a popular option for many government and large corporate organizations.',
      },
      {
        type: 'subheading',
        id: 'sitecore',
        text: 'Sitecore',
      },
      {
        type: 'paragraph',
        text: 'One of the leading proprietary options, Sitecore offers a CMS with a range of different tools that plug into it. The major difference between this platform and the open-source options is that a single company controls the ecosystem and they charge a substantial licensing fee to use it (which can run over $10K annually). Developers aren’t able to augment the system like you can with Wordpress and Drupal, which forces customers into costly upgrades for every feature. While developers can customize the user interface and deliver competent websites, the limitations of the platform make it a questionable choice.',
      },
      {
        type: 'subheading',
        id: 'adobe-experience-manager',
        text: 'Adobe Experience Manager',
      },
      {
        type: 'paragraph',
        text: 'Another major proprietary offering, Adobe’s CMS is often selected because it is backed by a giant corporation which gives prospective customers confidence. It’s a very expensive option, with an annual license that can run into the tens of thousands of dollars. Customers gravitate to this solution because it offers considerable scalability and the backing of Adobe.',
      },
    ],
  },
  {
    slug: 'headless-websites',
    status: 'ready',
    lede: 'In nearly all instances, if something is headless, that’s a major problem. Except in the world of web development where the Headless CMS reigns supreme and allows developers to create truly cutting-edge sites.',
    sections: [
      {
        type: 'paragraph',
        text: 'This category of websites flies under the radar for most people, often because of the foreign sounding name. The term ‘headless’ may conjure up a B-movie plot line but in web development, the term simply means the website doesn’t have a user interface. This may sound counterintuitive but the concept makes sense the more you learn about the process.',
        lead: true,
      },
      {
        type: 'paragraph',
        text: 'Before diving into what a headless CMS offers, it’s important to know what a CMS does so check out that explainer if you haven’t already.',
      },
      {
        type: 'paragraph',
        text: 'Conceptually, this class of websites should probably be called Unbundled CMS or Content-Only CMS products. The idea behind them is two-fold:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'These sites concentrate solely on the task of content management / distribution and,',
          'They separate the back-end content of a website from the front-end presentation',
        ],
      },
      {
        type: 'paragraph',
        text: 'Both of these ideas have grown from the new capabilities that the world of software-as-a-service (SaaS) cloud platforms have unlocked. Older, monolithic CMS products attempted to handle everything, whereas headless CMS products are laser-focused on content. The features that headless CMS sites lack (search, UI, authentication) are instead served by other cloud products. This model creates a constellation of best-in-class services from a host of specialized providers.',
      },
      {
        type: 'quote',
        text: '“Headless CMS products are laser-focused on content.”',
      },
      {
        type: 'paragraph',
        text: 'This doesn’t mean all web projects will benefit from a headless approach. Smaller sites tend to actually do better with a basic CMS, as the monolithic nature of those products better matches those use-cases. However, if the site has thousands of pages or if you anticipate a network of sites where you will want to mix and match content, headless systems are the preferred method to build today.',
      },
      {
        type: 'paragraph',
        text: 'With this impressive technology comes some subtle drawbacks. The price point to procure this type of site is higher and the integration of multiple cloud services necessitates increased maintenance over time. The initial development also takes an experienced firm like THOR to design and develop the site. The technical aspects and in particular the interface of the site must be constructed using specific methods.',
      },
      {
        type: 'heading',
        id: 'a-1',
        text: 'What will my headless CMS website look like if the service doesn’t offer a UI?',
      },
      {
        type: 'paragraph',
        text: 'If you’re investing in a new website for your organization, more than likely you’re looking for a custom look and feel as the primary feature. That’s part of the reason headless solutions make sense: No-code and traditional CMS sites force a templated look that advanced developers throw away immediately upon starting a site using those basic platforms.',
      },
      {
        type: 'paragraph',
        text: 'Another revolution in web development that has taken shape since 2018 and enables headless sites are component-based interfaces powered by React. Most traditional CMS products were designed around page-based templates that assume each content item only shows up on a single type of page. Component systems free you from that constraint and allow reusable content items to appear on one page, many pages, or even many different websites.',
      },
      {
        type: 'paragraph',
        text: 'This is possible because a headless CMS doesn’t tie the front-end of a website to the content in the back-end. Instead, developers can access all of the website content as a data object coming from an API or GraphQL service. This is especially powerful if your organization plans to reuse content across different sites over time.',
      },
      {
        type: 'paragraph',
        text: 'Component-based UI, headless CMS and cloud-native tools are sometimes grouped together into a category of websites called the JAMStack.',
      },
      {
        type: 'heading',
        id: 'a-2',
        text: 'Some of the headless providers and our thoughts',
      },
      {
        type: 'subheading',
        id: 'contentful',
        text: 'Contentful',
      },
      {
        type: 'paragraph',
        text: 'This firm was one of the first headless CMS providers and is still one of the best, despite having a steep learning curve. Their product emphasizes an approach they call ‘content mesh’ which creates a highly modular approach to content creation that some content teams find confusing when coming from a WordPress or similar background. Their product is class leading but as you might expect, it is also one of the most expensive options. It is a good idea to demo this product, ideally testing with your own content, before buying.',
      },
      {
        type: 'subheading',
        id: 'prismic',
        text: 'Prismic',
      },
      {
        type: 'paragraph',
        text: 'This is another solid option for headless sites, as it offers a lot of the same features of Contentful but at a much lower price point. THOR has used this tool with great success on numerous projects. The only downside is that their dev team can be a little slow to respond to requests and their application suffers from bugs more often than Contentful.',
      },
      {
        type: 'subheading',
        id: 'sanity',
        text: 'Sanity',
      },
      {
        type: 'paragraph',
        text: 'Sanity is one of the newest headless providers and offers a highly opinionated way to guide how you develop content. Whereas Contentful and Prismic offer a web-based backend that many editors coming from WordPress-like CMS products will find familiar, Sanity offers a desktop application that builds out a ‘content lake’ that necessitates customization to get right. Historically they used a proprietary data retrieval standard called GROQ instead of the industry standard GraphQL, although both are now supported.',
      },
      {
        type: 'subheading',
        id: 'strapi',
        text: 'Strapi',
      },
      {
        type: 'paragraph',
        text: 'Strapi is the open-source alternative to the three proprietary options listed above. It covers most of the same feature set although it is rough around the edges and does not yet offer a cloud-based hosting option. It is the newest of the headless providers and THOR recommends a wait and see pattern with this tool for now, but it is developing very nicely.',
      },
      {
        type: 'heading',
        id: 'a-3',
        text: 'Price points',
      },
      {
        type: 'paragraph',
        text: 'When shopping for a headless CMS, you will need a content cloud service to power your CMS and a separate cloud instance for the front-end of your website. This results in multiple paid hosting accounts. Added to this will be services like authentication and search with their own set of hosting fees. This results in an approximate hosting cost of $250-500/mo range. By comparison, a traditional CMS can be hosted on quality infrastructure for $100-200/mo.',
      },
      {
        type: 'paragraph',
        text: 'Additionally, the cost to develop and maintain a custom UI with components is higher than a traditional CMS with page-based templates. We recommend a budget of at least $50K to start a project like this, with the assumption that there will be additional on-going maintenance costs given the network of integrations that compose the site.',
      },
      {
        type: 'callout',
        title: 'How to get started',
        text: 'The best place to start this process is with a deep site audit. If you need guidance you can reach out to THOR for assistance in that process. Audits are valuable in revealing organizational challenges, underleveraged strengths, new strategies for optimizing the use of existing assets, and areas of new content development to support goals within the organization. This is also a time to establish support for the project on all levels, especially the C-suite, as a major website redesign will likely touch every part of your organization. If you’re starting from scratch, content development is a key area to consider. Begin by profiling 3-4 sites you appreciate that are at least tangentially related to your field. You’ll start to see patterns within them that indicate what you perceive as good usability. Developing an understanding of the components that create a good user experience—both functionally and aesthetically—is a great place to start. Your friends at THOR are happy to talk through some of the options, implications and how we can help make your headless CMS site a successful reality.',
        contact: true,
      },
    ],
  },
  {
    slug: 'naming-and-positioning',
    status: 'ready',
    lede: 'A memorable brand starts with a clear idea of who you are, who you serve, and why your work matters. Naming and positioning give that idea a language your team can use with confidence.',
    sections: [
      {
        type: 'paragraph',
        lead: true,
        text: 'A name has a demanding job. It needs to introduce an organization, create the right expectations, and leave room for the work to grow. Before choosing words, it helps to agree on the idea those words need to carry.',
      },
      {
        type: 'paragraph',
        text: 'Positioning makes that idea explicit. It describes the audience you want to reach, the need you answer, and the qualities that distinguish your approach. This gives naming, messaging, and design a shared point of reference instead of asking each of them to solve a different problem.',
      },
      {
        type: 'heading',
        id: 'start-with-understanding',
        text: 'Start with understanding',
      },
      {
        type: 'paragraph',
        text: 'Begin with the people closest to the organization and the people it serves. What do they value? What language do they use to describe the work? Where do their perceptions agree, and where do they diverge? Interviews, existing communications, and a review of the surrounding landscape can reveal useful patterns.',
      },
      {
        type: 'paragraph',
        text: 'The purpose is to find something specific enough to guide decisions. A broad claim such as quality or innovation offers little direction on its own. A useful positioning idea connects a real audience need to something the organization can demonstrate through its work.',
      },
      {
        type: 'heading',
        id: 'give-the-name-a-brief',
        text: 'Give the name a brief',
      },
      {
        type: 'paragraph',
        text: 'A naming brief turns that understanding into criteria. It sets out the intended audience, desired tone, scope of the organization, and practical constraints. It should also explain what the name needs to accommodate in the future, from new services to different channels.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Meaning: What should the name suggest about the organization?',
          'Voice: Should it feel direct, expressive, established, or unexpected?',
          'Usability: Can people say it, spell it, and recognize it in conversation?',
          'Range: Does it work across the places the brand will appear?',
        ],
      },
      {
        type: 'paragraph',
        text: 'Review possible names against the brief rather than relying on personal preference alone. Trying them in a page heading, a presentation, or a spoken introduction can expose problems that a list of words will not. Practical availability checks belong in the selection process before committing to a launch.',
      },
      {
        type: 'heading',
        id: 'turn-positioning-into-language',
        text: 'Turn positioning into language',
      },
      {
        type: 'paragraph',
        text: 'The name is one part of a larger verbal system. A concise description explains what the organization does. Key messages give different audiences an entry point. Voice guidance helps a team communicate consistently while leaving room for individual people and different situations.',
      },
      {
        type: 'paragraph',
        text: 'These tools should be useful in everyday work. Test the language against real content: an introduction, a service description, a campaign, or a frequently asked question. If the same idea can support each of those without becoming repetitive, the positioning is starting to do its job.',
      },
      {
        type: 'callout',
        title: 'Carry the idea through',
        text: 'THOR’s branding work connects positioning with visual identity, guidelines, and rollout across print, web, and product. A clear idea at the center helps the entire system hold together.',
        contact: true,
      },
    ],
  },
  {
    slug: 'visual-identity-systems',
    status: 'ready',
    lede: 'A visual identity is a set of decisions that work together. Logos, color, typography, imagery, and motion give a brand a recognizable presence across print, web, and product.',
    sections: [
      {
        type: 'paragraph',
        lead: true,
        text: 'A logo rarely appears alone. It sits beside a headline, inside a navigation bar, on a publication cover, or within a presentation. The surrounding choices determine whether those different applications feel like parts of the same organization.',
      },
      {
        type: 'paragraph',
        text: 'An identity system gives those choices a common foundation. It defines the elements that make the brand distinctive and explains how to combine them. The result should be flexible enough for different kinds of content and clear enough for a team to use consistently.',
      },
      {
        type: 'heading',
        id: 'build-a-shared-foundation',
        text: 'Build a shared foundation',
      },
      {
        type: 'paragraph',
        text: 'Start with the brand’s positioning and the contexts in which it needs to appear. A publication, a website, and an event all have different demands. Designing with those applications in mind helps establish an identity that can carry the work instead of depending on a single presentation.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Logo: A useful set of arrangements and versions for different sizes and backgrounds.',
          'Color: A palette with clear roles and practical combinations for text and surfaces.',
          'Typography: A hierarchy that supports expressive headlines and readable everyday content.',
          'Imagery and graphics: A consistent approach to photography, illustration, charts, and supporting elements.',
          'Motion: Behavior that supports the identity and makes interfaces easier to understand.',
        ],
      },
      {
        type: 'paragraph',
        text: 'These elements need to be evaluated together. A color can feel different beside a new typeface. A strong graphic treatment can compete with a photograph. Testing complete compositions reveals how the system behaves when real material enters the picture.',
      },
      {
        type: 'heading',
        id: 'test-real-applications',
        text: 'Test real applications',
      },
      {
        type: 'paragraph',
        text: 'Use representative content to test the identity early. Try a long headline as well as a short one. Look at a dense page as well as a spare one. Check small screens and printed material. These situations help identify which decisions should remain fixed and where the system needs options.',
      },
      {
        type: 'paragraph',
        text: 'Readability and accessibility belong in these decisions. Type needs to support the people reading it, color combinations need sufficient contrast, and information should remain clear without relying on color alone. Digital motion should respect reduced-motion preferences.',
      },
      {
        type: 'heading',
        id: 'make-consistency-practical',
        text: 'Make consistency practical',
      },
      {
        type: 'paragraph',
        text: 'Guidelines are most helpful when they answer the questions a team encounters during production. Show the correct assets, explain spacing and hierarchy, and include examples of common applications. Templates and reusable components put those decisions directly into the tools people use.',
      },
      {
        type: 'paragraph',
        text: 'An identity also needs care after launch. New channels, changing content, and new contributors will test the original rules. Keeping the source assets and guidance current helps the organization extend the system without losing its character.',
      },
      {
        type: 'callout',
        title: 'A system built to keep working',
        text: 'THOR designs identity systems and the guidelines, templates, and tools that support them. Our NIRI rebrand is an example of a scalable system maintained through an ongoing design partnership.',
        contact: true,
      },
    ],
  },
];

export function getPublishedArticles(records: readonly Article[] = articles) {
  return records.filter(
    (article) =>
      article.status === 'ready' &&
      article.sections.length > 0 &&
      howWeWorkGroups.some((group) =>
        group.articles.some(
          (preview) =>
            preview.slug === article.slug &&
            preview.status === 'ready' &&
            preview.url
        )
      )
  );
}

export function getArticle(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getArticleContext(slug: string) {
  if (!getArticle(slug)) return undefined;
  const group = howWeWorkGroups.find((item) =>
    item.articles.some((preview) => preview.slug === slug)
  );
  if (!group) return undefined;
  const preview = group.articles.find((item) => item.slug === slug)!;
  const series = group.articles.filter((item) => getArticle(item.slug));
  const index = series.findIndex((item) => item.slug === slug);
  return {
    group,
    preview,
    series,
    position: index + 1,
    previous: series[index - 1],
    next: series[index + 1],
  };
}

export function getArticlePreview(slug: string): HowWeWorkArticle | undefined {
  return getArticle(slug) ? getArticleContext(slug)?.preview : undefined;
}
