export interface Project {
  slug: string
  title: string
  /** Path under /public, e.g. "/images/projects/my-project.jpg".
   *  Leave as empty string to show a placeholder gradient instead. */
  image: string
  /** One-liner shown on the card */
  description: string
  /** Full text shown in the modal and standalone page */
  longDescription: string
  /** URL to live demo, GitHub repo, etc. */
  link: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'salt',
    title: 'SALT — VS Code Rust Extension',
    image: '/images/project1.png',
    description:
      'A VS Code extension for Rust code comprehension and error-tracking, built at the Coblenz Lab at UCSD.',
    longDescription:
      'As an Undergraduate Researcher at the Coblenz Lab (UC San Diego), I performed comparisons of functional vs. imperative Rust through Qualtrics surveys amassing over 200 responses, implemented data analysis and visualizations for Linear Mixed Models, thematic analysis, and Mann-Whitney U, and integrated AWS Lambda for back-end data management. SALT helps developers understand Rust compiler errors and track code quality. Launched in December 2023, it has surpassed 240 installations. I designed the UI/UX for the front-end of the extension using Figma and HTML.',
    link: 'https://marketplace.visualstudio.com/items?itemName=Kale-Lab.salt',
    tags: ['Rust', 'VS Code', 'AWS Lambda', 'Figma', 'Research'],
  },
  {
    slug: 'its-about-time',
    title: "It's About Time — MSR 2025 Paper",
    image: '/images/project2.png',
    description:
      'Co-authored an empirical study of date and time bugs in open-source Python software, accepted at MSR 2025.',
    longDescription:
      'As a Software Engineering Researcher at the CMU PASTA Lab (Carnegie Mellon University), I created static analysis tools with CodeQL to optimize the detection of datetime bugs in software after performing data analysis on over 500 GitHub issues in open-source Python projects. I conducted analysis on time-related bugs and their impact on performance. The resulting paper, "It\'s About Time: An Empirical Study of Date and Time Bugs in Open-Source Software," was accepted into MSR 2025 and won a Technical Track Distinguished Paper Award.',
    link: 'https://2025.msrconf.org/details/msr-2025-technical-papers/35/It-s-About-Time-An-Empirical-Study-of-Date-and-Time-Bugs-in-Open-Source-Python-Softw',
    tags: ['CodeQL', 'Python', 'Static Analysis', 'Research', 'CMU'],
  },
  {
    slug: 'roomdreaming',
    title: 'RoomDreaming — CHI 2024 Paper',
    image: '/images/project3.jpg',
    description:
      'Secondary author of a generative-AI approach to interior design exploration, published at CHI 2024.',
    longDescription:
      'As an Undergraduate AI Researcher at the NTU HCI Lab (National Taiwan University), I co-authored "RoomDreaming: Generative-AI Approach to Facilitating Iterative, Preliminary Interior Design Exploration." The paper was accepted into CHI 2024 and published on the ACM Digital Library in May 2024. I engineered prompts for Stable Diffusion and ChatGPT, and designed, conducted, and transcribed user interviews to drive data-informed UI/UX improvements.',
    link: 'https://dl.acm.org/doi/10.1145/3613904.3642901',
    tags: ['Generative AI', 'Stable Diffusion', 'UX Research', 'CHI 2024'],
  },
  {
    slug: 'soupasaurus',
    title: 'Soupasaurus — LAHacks',
    image: '/images/project4.png',
    description:
      'An AI-powered choose-your-own-adventure personality test game built in Unity at LAHacks.',
    longDescription:
      'Built at LAHacks (Los Angeles, CA), Soupasaurus is an AI-based personality test game that asks: "If you were a soup, what soup would you be?" Designed in Unity with C# and Python, the game integrates Google\'s Gemini API to generate unique dialogue with every playthrough, pairing players with quirky dinosaur characters before revealing their soup personality.',
    link: 'https://mkingco.itch.io/soupasaurus',
    tags: ['Unity', 'C#', 'Python', 'Gemini API', 'Game Dev'],
  },
]
