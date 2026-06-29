// =============================================================
//  SINGLE SOURCE OF TRUTH for the whole portfolio.
//  Edit your CV information HERE — no need to touch component code.
//  Extracted from NGUYEN-VIET-TRI-CV.pdf
// =============================================================
import { Boxes, Code2, Database, Server, Sparkles, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import cvFile from "@/files/cv.pdf";
import profileImage from "@/assets/profile.jpg";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

/* ----------------------------- PROFILE ----------------------------- */
export const profile = {
  name: "Nguyen Viet Tri",
  initials: "NVT",
  title: "FullStack Developer & Blockchain Engineer",
  greeting: "Hello, I'm",
  tagline:
    "Building scalable full-stack, blockchain (RWA, DeFi, NFT) and AI-driven commerce products. Specialized in Solidity, Node.js, Next.js, and payment infrastructure.",
  email: "tri.nv.cntt@gmail.com",
  phone: "0383087803",
  phoneHref: "tel:+84383087803",
  location: "Đà Nẵng",
  dob: "21/10/2000",
  github: "https://github.com/robert-nvt",
  linkedin: "https://www.linkedin.com/in/tringuyenviet/",
  profileImage,
  cvFile,
  cvDownloadName: "Nguyen-Viet-Tri-CV.pdf",
};

/* ----------------------------- ABOUT ------------------------------- */
export const about = {
  heading: "Career Objective",
  subheading:
    "FullStack & Blockchain Developer focused on scalable, real-world products",
  cardTitle: "Blockchain, Fintech & Commerce Builder",
  paragraphs: [
    "My goal is to gain a strong understanding of cryptocurrency, blockchain technology, and modern e-commerce systems, focusing on building scalable products with real-world impact.",
    "I aim to research and develop practical applications of Blockchain, payment infrastructure, and digital commerce solutions that improve how people transact, interact, and manage value online.",
    "Through this journey, I hope to deepen my expertise in distributed systems, fintech, and commerce technologies while continuously improving my teamwork, leadership, and product development skills.",
  ],
  highlightsTitle: "What I Bring",
  highlights: [
    "5+ years building full-stack & blockchain applications",
    "Smart contracts in Solidity, Rust, Move & Cairo across many chains",
    "RWA, DeFi, NFT Marketplace, Launchpad & DEX experience",
    "Global payment infrastructure (Stripe, Paypal, Airwallex, Checkout.com)",
    "AI-First development workflows with Claude, Cursor & MCP",
  ],
};

/* ----------------------------- STATS ------------------------------- */
type Stat = { icon: LucideIcon; label: string; value: string };
export const stats: Stat[] = [
  { icon: Code2, label: "Featured Projects", value: "7+" },
  { icon: Boxes, label: "Years Experience", value: "5+" },
  { icon: Server, label: "Companies Worked", value: "6+" },
  { icon: Database, label: "Blockchain Networks", value: "10+" },
];

/* --------------------------- EXPERIENCE ---------------------------- */
export type ExperienceTech = { label: string; value: string };
export type Experience = {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  techStack: ExperienceTech[];
  links?: { label: string; url: string }[];
};
export const experiences: Experience[] = [
  {
    title: "Fullstack Developer",
    company: "PENGUIN SECRET AGENCY CO., LTD",
    period: "11/2025 - 5/2026",
    achievements: [
      "Applied AI-First development workflows to accelerate software delivery, debugging, architecture design, and code reviews.",
      "Developed scalable full-stack commerce and payment infrastructure for AI-driven commerce platforms.",
      "Integrated global payment systems using Stripe Connect, Authorize.net, Airwallex, and Checkout.com for onboarding, payouts, and checkout processing.",
      "Built secure checkout, recurring billing, subscription management, and transaction monitoring systems.",
      "Developed merchant/store management platforms and commerce tools similar to Shopify for orders, products, and payment operations.",
      "Designed RESTful APIs, webhook services, and event-driven architectures for payment and order synchronization.",
      "Optimized backend systems for scalability, reliability, and high-volume transaction processing.",
    ],
    techStack: [
      { label: "Frontend", value: "TypeScript, Next.js" },
      { label: "Backend", value: "Node.js, Nest.js, Python (FastAPI)" },
      { label: "Database", value: "PostgreSQL, Redis" },
      { label: "Payment Infrastructure", value: "Stripe Connect, Paypal, Authorize.net, Airwallex, Checkout.com" },
      { label: "AI Engineering", value: "Claude, ChatGPT, Cursor, MCP (Model Context Protocol), AI Agents, Prompt Engineering" },
      { label: "Architecture & Tools", value: "REST API, Webhooks, Docker, AWS, Prisma ORM, GraphQL" },
    ],
  },
  {
    title: "FullStack Developer - Blockchain Engineer",
    company: "MEEY GROUP JSC",
    period: "11/2025 - 5/2026",
    achievements: [
      "Designed and developed end-to-end decentralized applications (dApps) within an RWA (Real World Assets) ecosystem, focusing on real estate tokenization (Property Token Offering – PTO).",
      "Developed and maintained smart contracts for core modules including asset tokenization, NFT standards, marketplace, staking, vesting, and governance mechanisms (ERC-20, ERC-721, and custom implementations).",
      "Built and optimized backend services using Node.js and NestJS to handle off-chain data processing, indexing, and synchronization with on-chain state.",
      "Integrated Web3 libraries (Ethers.js, Web3.js, Viem) to support wallet connections (MetaMask, WalletConnect) and multi-chain interactions (Ethereum, Base, Arbitrum).",
      "Designed scalable system architecture for DeFi components including staking pools, liquidity management, and yield distribution mechanisms.",
      "Collaborated with product, business, and community teams to launch tokenized asset offerings and onboard real estate partners into the ecosystem.",
      "Researched and implemented scalable blockchain solutions including Layer 2 integrations, modular architectures, and indexing services.",
      "Built subgraph/indexing systems to enable efficient on-chain data querying for real-time analytics and frontend performance optimization.",
      "Participated in smart contract reviews, gas optimization, and security improvements for high-value financial transactions.",
    ],
    techStack: [
      { label: "Smart Contract", value: "Solidity" },
      { label: "Frontend", value: "TypeScript, Next.js, React" },
      { label: "Backend", value: "Node.js, Nest.js, Go" },
      { label: "Database", value: "PostgreSQL, MongoDB" },
      { label: "Web3", value: "Web3.js, Ethers.js, Viem" },
      { label: "Networks", value: "Ethereum, Base, etc." },
      { label: "Audit", value: "Certik, SolidProof / TrustNet" },
    ],
  },
  {
    title: "Blockchain Fullstack Developer",
    company: "FTECH CO., LTD",
    period: "12/2022 - 10/2025",
    achievements: [
      "Designed and developed end-to-end blockchain applications including smart contracts, backend APIs, and frontend logic.",
      "Building and developing Launchpad, AMM, Aggregator, DEXs, CLOB, NFT Marketplaces, DeFi platforms, GameFi projects, Paymaster, etc.",
      "Operate and coordinate with the community team to add partner projects in certain streams.",
      "Integrated smart contract logic into frontend (Next.js) and backend (Nest.js).",
      "Conducted research on system architectures and proposed solutions on various blockchain platforms.",
      "Building, fundraising, and applying to ecosystems on Solana, Sui, Aptos, Starknet, etc.",
      "Developed subgraphs and data services to support scalable and efficient dApp architectures.",
      "Knowledge about (crypto) trading mechanisms and products.",
    ],
    techStack: [
      { label: "Smart Contract", value: "Solidity, Rust, Move, Cairo" },
      { label: "Frontend", value: "TypeScript, Next.js, React.js" },
      { label: "Backend", value: "Node.js, Nest.js" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Web3", value: "Web3.js, Ethers.js" },
      { label: "Networks", value: "Ethereum, Polygon, BSC, Sui, Starknet, Solana, etc." },
    ],
  },
  {
    title: "Blockchain Developer",
    company: "SOTATEK., JSC",
    period: "01/2022 - 11/2022",
    achievements: [
      "Developed an NFT Marketplace using Wyvern Protocol and OpenZeppelin, integrating ERC721/ERC1155 contracts with on-chain metadata.",
      "Deployed and optimized EVM-compatible smart contracts, built a comprehensive test suite with Hardhat, Solidity, Ethers.js, and TypeScript.",
      "Participated in the development of a DEX platform based on the Uniswap V2 protocol, implementing token swap and liquidity pool management.",
    ],
    techStack: [
      { label: "Tech Stack", value: "Solidity, OpenZeppelin, Hardhat, Web3.js, Ethers.js, TypeScript" },
      { label: "Networks", value: "Ethereum, Polygon, BSC" },
    ],
  },
  {
    title: "Smart Contract Engineer",
    company: "ANEED",
    period: "08/2021 - 12/2022",
    achievements: [
      "Developed Smart Contracts for prize-winning games.",
      "Developed Smart Contracts for the SocialFi theme of the VBI Lab Hackathon.",
      "Researched and participated in Hackathons.",
      "Top 10 in the VBI Hackathon.",
    ],
    techStack: [
      { label: "Tech Stack", value: "Solidity, OpenZeppelin, Hardhat, Web3.js, Ethers.js" },
      { label: "Networks", value: "Ethereum, BSC" },
    ],
    links: [
      { label: "Smart-Contract-Connecus", url: "https://github.com/Connecus-Team/Smart-Contract-Connecus" },
    ],
  },
  {
    title: "Data Engineer",
    company: "EUP GROUP",
    period: "11/2020 - 7/2021",
    achievements: [
      "Collected vocabulary data sets for the mazii.net website.",
      "Transferred data from CSV to database tables.",
      "Researched OCR problems for Japanese character detection and recognition.",
      "Utilized available Google APIs for OCR purposes.",
    ],
    techStack: [],
    links: [{ label: "mazii.net", url: "https://mazii.net/" }],
  },
];

/* ---------------------------- PROJECTS ----------------------------- */
export type ProjectLink = { label: string; url: string };
export type Project = {
  title: string;
  role: string;
  period: string;
  description: string;
  image: string;
  tags: string[];
  team?: number;
  links: ProjectLink[];
};
export const projects: Project[] = [
  {
    title: "makezbrightgifts",
    role: "FullStack Developer",
    period: "12/2025 - Present",
    description:
      "E-commerce, AI Commerce / Agentic Commerce platform with global payment processing and merchant tooling.",
    image: project3,
    tags: ["Nest.js", "FastAPI", "Stripe", "Paypal"],
    team: 10,
    links: [
      { label: "makezbrightgifts.com", url: "https://makezbrightgifts.com/" },
      { label: "shopquantum.ai", url: "https://shopquantum.ai/" },
    ],
  },
  {
    title: "MeyFi - MeyReal",
    role: "Full Stack Developer",
    period: "10/2025 - Present",
    description:
      "RWA (Real World Assets) + DeFi + NFT Marketplace ecosystem focused on real estate tokenization.",
    image: project1,
    tags: ["Solidity", "Nest.js", "Base", "EVM"],
    team: 10,
    links: [
      { label: "mey.network", url: "https://mey.network/" },
      { label: "meyfi.io", url: "https://meyfi.io/" },
    ],
  },
  {
    title: "Ventory",
    role: "Full Stack Developer",
    period: "03/2024 - 10/2025",
    description:
      "NFT Marketplace + DEX + Memecoin.Fun + Multi-chain. Smart contract programming, contract calls with Next.js, storage solutions and project operations.",
    image: project2,
    tags: ["Rust", "Move", "Solidity", "Cairo", "Next.js", "Solana", "EVM", "NonEVM"],
    team: 5,
    links: [{ label: "x.com/Ventory_gg", url: "https://x.com/Ventory_gg" }],
  },
  {
    title: "Bluemove",
    role: "Full Stack Developer",
    period: "03/2023 - 05/2024",
    description:
      "NFT Marketplace + DEX + Memecoin.Fun + Bot on Sui. Smart contract programming and contract calls with Next.js.",
    image: project3,
    tags: ["Rust", "Move", "Next.js", "Sui"],
    team: 5,
    links: [
      { label: "dex.bluemove.net", url: "https://dex.bluemove.net/" },
      { label: "movepump.com", url: "https://movepump.com/" },
      { label: "x.com/bluemove_oa", url: "https://x.com/bluemove_oa" },
    ],
  },
  {
    title: "Dragark",
    role: "Blockchain Developer",
    period: "03/2024 - 05/2025",
    description:
      "A fully onchain game. Smart contract programming in Cairo with Dojo connection for a fully onchain game.",
    image: project1,
    tags: ["Cairo", "Dojo", "TypeScript", "Starknet"],
    links: [{ label: "x.com/playDRAGARK", url: "https://x.com/playDRAGARK" }],
  },
  {
    title: "Pace Art NFT",
    role: "Blockchain Developer",
    period: "02/2022 - 10/2022",
    description:
      "NFT Marketplace. Smart contract programming, contract calls with Next.js and storage solutions.",
    image: project2,
    tags: ["Solidity", "OpenZeppelin", "Web3.js", "Ethers.js"],
    team: 3,
    links: [
      { label: "sotatek.com/portfolio/pace-art-nft", url: "https://www.sotatek.com/portfolio/pace-art-nft/" },
    ],
  },
  {
    title: "IDO Platform",
    role: "Blockchain Developer",
    period: "01/2022 - 02/2022",
    description:
      "Dual ICO and INO Launchpad. Smart contract programming, contract calls with Next.js and storage solutions.",
    image: project3,
    tags: ["Solidity", "React.js", "Ethereum", "Arbitrum"],
    team: 3,
    links: [
      { label: "sotatek.com/portfolio/ido-platform", url: "https://www.sotatek.com/portfolio/ido-platform/" },
    ],
  },
];

/* ----------------------------- SKILLS ------------------------------ */
export type SkillCategory = {
  icon: LucideIcon;
  title: string;
  skills: { name: string; level: number }[];
};
export const skillCategories: SkillCategory[] = [
  {
    icon: Boxes,
    title: "Smart Contract",
    skills: [
      { name: "Solidity", level: 95 },
      { name: "Rust", level: 82 },
      { name: "Move", level: 82 },
      { name: "Cairo", level: 80 },
    ],
  },
  {
    icon: Code2,
    title: "Frontend",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 93 },
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Nest.js", level: 90 },
      { name: "Python (FastAPI)", level: 82 },
      { name: "Go", level: 72 },
    ],
  },
  {
    icon: Database,
    title: "Database & Web3",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB / Redis", level: 85 },
      { name: "Ethers.js / Web3.js", level: 92 },
      { name: "Viem / Subgraph", level: 85 },
    ],
  },
  {
    icon: Wallet,
    title: "Payment Infrastructure",
    skills: [
      { name: "Stripe Connect", level: 90 },
      { name: "Paypal", level: 85 },
      { name: "Airwallex", level: 82 },
      { name: "Authorize.net / Checkout.com", level: 82 },
    ],
  },
  {
    icon: Sparkles,
    title: "AI Engineering & Tools",
    skills: [
      { name: "Claude / ChatGPT / Cursor", level: 90 },
      { name: "MCP & AI Agents", level: 85 },
      { name: "Docker / AWS", level: 85 },
      { name: "Prisma / GraphQL", level: 85 },
    ],
  },
];

/* ---------------------------- EDUCATION ---------------------------- */
export type Education = {
  school: string;
  degree: string;
  period: string;
  details: string[];
};
export const education: Education[] = [
  {
    school: "FUNIX (FPT)",
    degree: "BlockChain Developer",
    period: "10/2021 - 05/2022",
    details: [
      "Smart Contracts",
      "Blockchain & Distributed Technologies",
      "DApp Development, DeFi Protocols & Tokenomics",
      "Tools & Frameworks",
    ],
  },
  {
    school: "HANOI UNIVERSITY OF INDUSTRY (HAUI)",
    degree: "Information Technology",
    period: "08/2018 - 01/2022",
    details: ["GPA: 2.9 / 4"],
  },
];

/* -------------------------- ACTIVITIES ----------------------------- */
export type Activity = {
  organization: string;
  role: string;
  period: string;
  items: string[];
};
export const activities: Activity[] = [
  {
    organization: "HAUI INFORMATION TECHNOLOGY OLYMPIC TEAM",
    role: "Member",
    period: "01/2019 - 2022",
    items: [
      "Practiced algorithmic thinking",
      "Awarded 3rd prize in the ACM/ICPC University Contest organized by the Military Technical Academy",
      "Qualified for the National round of the ACM/ICPC contest",
    ],
  },
  {
    organization: "HANOI UNIVERSITY OF INDUSTRY IT CLUB",
    role: "Member",
    period: "11/2019 - 2023",
    items: [
      "Organized student competitions such as the HaUI ACM-ICPC with over 50 teams",
      "Supported Python, C/C++, Algorithm and Data Structure programming classes",
      "Independently researched AI problems",
      "Received a consolation prize in the Olympiad organized by the University and the Club",
    ],
  },
];

/* ---------------------- AWARDS & CERTIFICATIONS -------------------- */
export type Award = {
  title: string;
  date: string;
  link?: string;
};
export const awards: Award[] = [
  {
    title: "Starknet Winter Hackathon",
    date: "01/2025",
    link: "https://app.buidlbox.io/starknet/starknet-winter/overview",
  },
  { title: "First Prize of MCI Competition - The Expert Coder 2021", date: "08/2021" },
  { title: "Third Prize - ACM/ICPC University Competition", date: "10/2019" },
  { title: "Data Science with Facebook Developer Circles", date: "10/2019" },
];

/* ---------------------------- OTHER SKILLS ------------------------- */
export const otherSkills: string[] = [
  "Researching airdrops, monitoring the market and following potential Blockchain projects",
  "Continuously learning the languages of new blockchains",
  "Capable of self-learning and problem-solving",
  "Proficient with Windows, Linux and Git",
  "Able to read and work with documents in English",
];

/* ----------------------------- NAV --------------------------------- */
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

/* ----------------------------- CONTACT ----------------------------- */
export const contact = {
  heading: "Get In Touch",
  subheading: "Let's discuss your next project or opportunity",
  blurb:
    "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
};

/* ----------------------------- FOOTER ------------------------------ */
export const footer = {
  blurb:
    "FullStack & Blockchain Developer building scalable RWA, DeFi and AI-driven commerce products.",
  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
};
