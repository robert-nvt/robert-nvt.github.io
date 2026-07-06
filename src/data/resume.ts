// =============================================================
//  SINGLE SOURCE OF TRUTH for the whole portfolio.
//  Edit your CV information HERE — no need to touch component code.
//  Extracted from NGUYEN-VIET-TRI-CV.pdf
// =============================================================
import { Boxes, Code2, Database, Network, Server, Sparkles, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import cvFile from "@/files/cv.pdf";
import profileImage from "@/assets/profile.jpg";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import sonarTrading1 from "@/assets/sonar-trading-1.jpg";
import sonarTrading2 from "@/assets/sonar-trading-2.jpg";
import sonarTrading3 from "@/assets/sonar-trading-3.jpg";
import shopQuantum1 from "@/assets/shopquantum-1.jpg";
import shopQuantum2 from "@/assets/shopquantum-2.jpg";
import makezbright1 from "@/assets/makezbright-1.jpg";
import makezbright2 from "@/assets/makezbright-2.jpg";
import meyReal1 from "@/assets/meyreal-1.jpg";
import meyReal2 from "@/assets/meyreal-2.jpg";
import meyFi1 from "@/assets/meyfi-1.jpg";
import meyFi2 from "@/assets/meyfi-2.jpg";
import giaPhaDatVietIcon from "@/assets/gia-pha-dat-viet.jpg";
import certFacebookDataScience from "@/assets/facebook-data-science.png";
import certAcmIcpc from "@/assets/acm-icpc-third-prize.jpg";

/* ----------------------------- PROFILE ----------------------------- */
export const profile = {
  name: "Nguyen Viet Tri",
  nameNative: "Nguyễn Viết Trí",
  initials: "NVT",
  title: "FullStack Developer & Blockchain Engineer",
  greeting: "Hello, I'm",
  tagline:
    "Building scalable full-stack products with strong system design — event-driven architectures, message queues and payment infrastructure. Specialized in Node.js, Next.js and TypeScript, with deep blockchain experience (Solidity, RWA, DeFi, NFT).",
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
  cardTitle: "Blockchain, Fintech, Commerce & System Design Builder",
  paragraphs: [
    "My goal is to grow as a FullStack Developer with a strong foundation in system design, building scalable products across cryptocurrency, blockchain technology, and modern e-commerce with real-world impact.",
    "I aim to research and develop practical applications of Blockchain, payment infrastructure, and digital commerce solutions — leveraging event-driven architectures and message queues (Kafka, RabbitMQ, Redis) to improve how people transact, interact, and manage value online.",
    "Through this journey, I hope to deepen my expertise in distributed systems, high-throughput system design, fintech, and commerce technologies while continuously improving my teamwork, leadership, and product development skills.",
  ],
  highlightsTitle: "What I Bring",
  highlights: [
    "4.5+ years building full-stack & blockchain applications",
    "Build and integrate RESTful APIs",
    "System design for high-volume services with message queues (Kafka, RabbitMQ, Redis)",
    "Global payment infrastructure (Stripe, Paypal, Airwallex, Checkout.com)",
    "Smart contracts in Solidity, Rust, Move & Cairo across many chains",
    "RWA, DeFi, NFT Marketplace, Launchpad & DEX experience",
    "AI-First development workflows with Claude, Cursor & MCP",
  ],
};

/* ----------------------------- STATS ------------------------------- */
type Stat = { icon: LucideIcon; label: string; value: string };
export const stats: Stat[] = [
  { icon: Code2, label: "Featured Projects", value: "10+" },
  { icon: Boxes, label: "Years Experience", value: "4.5+" },
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
      { label: "Architecture & Tools", value: "REST API, Webhooks, Docker, AWS, Prisma ORM, GraphQL,Queue Systems, Message Brokers" },
    ],
  },
  {
    title: "FullStack Developer - Blockchain Engineer",
    company: "MEEY GROUP JSC",
    period: "11/2025 - 6/2026",
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
    title: "Fresher Data Engineer",
    company: "EUP GROUP",
    period: "11/2020 - 7/2021",
    achievements: [
      "Collected vocabulary data sets for the mazii.net website.",
      "Transferred data from CSV to database tables.",
      "Researched OCR problems for Japanese character detection and recognition.",
      "Utilized available Google APIs for OCR purposes.",
    ],
    techStack: [
      { label: "Tech Stack", value: "Python, Pandas, BeautifulSoup, OpenCV, MySQL" },
      { label: "Tools", value: "Google Cloud Vision API (OCR), Jupyter Notebook" },
    ],
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
  about?: string;
  keyFeatures?: string[];
  image: string;
  screenshots?: string[];
  tags: string[];
  team?: number;
  links: ProjectLink[];
};
export const projects: Project[] = [
  {
    title: "ShopQuantum - PlatformDTC",
    role: "FullStack Developer",
    period: "10/2025 - Present",
    description:
      "Autonomous AI Commerce / Agentic Commerce platform for DTC brands — AI agents build storefronts, run ads and operate commerce at scale.",
    about:
      "An enterprise-grade AI commerce platform for direct-to-consumer brands, where autonomous agents build storefronts, launch and optimize ads and recover abandoned revenue. I build the merchant platform and the commerce backend — a Shopify-like back office designed as event-driven services.",
    keyFeatures: [
      "Autonomous AI agents that build storefronts and operate commerce workflows end-to-end.",
      "Shopify-like merchant/store management platform for products, orders and payment operations.",
      "Stripe Connect onboarding, payouts and multi-merchant checkout processing.",
      "Event-driven architecture: webhook services and message queues to synchronize orders, payments and stores across services.",
      "RESTful APIs built with Nest.js and FastAPI on PostgreSQL/Redis, shipped with Docker on AWS.",
      "AI-First development workflow with Claude, Cursor and MCP across the codebase.",
    ],
    image: shopQuantum1,
    screenshots: [shopQuantum1, shopQuantum2],
    tags: ["Nest.js", "FastAPI", "AI Agents", "Stripe Connect"],
    team: 10,
    links: [{ label: "shopquantum.ai", url: "https://shopquantum.ai/" }],
  },
  {
    title: "makezbrightgifts",
    role: "FullStack Developer",
    period: "10/2025 - Present",
    description:
      "E-commerce platform for personalized gifts with global payment processing, secure checkout and order management.",
    about:
      "A direct-to-consumer e-commerce store for personalized gifts. I own the payment infrastructure and backend architecture — an event-driven system where checkout, billing, order processing and fulfillment are decoupled through message queues and processed asynchronously for reliability at high transaction volume.",
    keyFeatures: [
      "Global payment infrastructure: Stripe, PayPal, Authorize.net, Airwallex and Checkout.com.",
      "Event-driven order pipeline: message queues (BullMQ/Redis, RabbitMQ) decouple checkout, payment capture, order creation and fulfillment.",
      "Asynchronous background jobs for emails, invoices, inventory sync and payment reconciliation — with retry, backoff and dead-letter handling.",
      "Idempotent webhook consumers keeping payments, orders and fulfillment in sync across services.",
      "Secure checkout, recurring billing, subscription management and transaction monitoring.",
      "Backend optimized for scalability, reliability and high-volume transaction processing.",
    ],
    image: makezbright1,
    screenshots: [makezbright1, makezbright2],
    tags: ["Nest.js", "FastAPI", "Message Queue", "Async Processing", "Stripe", "Paypal"],
    team: 10,
    links: [{ label: "makezbrightgifts.com", url: "https://makezbrightgifts.com/" }],
  },
  {
    title: "Sonar Trading",
    role: "FullStack Developer",
    period: "2026 - Present",
    description:
      "Real-time crypto market intelligence platform — live whale alerts, liquidation heatmaps, funding rates, long/short ratios and a risk-free paper trading simulator with leaderboard.",
    about:
      "Sonar is a real-time crypto market intelligence platform I designed and built full-stack — a streaming data pipeline over exchange WebSockets feeding live dashboards, plus a risk-free perp paper-trading simulator to practice leverage trading on live prices.",
    keyFeatures: [
      "Real-time streaming pipeline over Binance WebSocket: trades, liquidations, order book and funding data.",
      "Paper trading engine with up to 125x leverage, limit/market orders, realistic slippage and simulated USDT balance.",
      "Live market dashboards: liquidation heatmap, long/short ratios, funding rates, open interest and Fear & Greed index.",
      "Whale alert feed aggregating large spot & futures orders across exchanges.",
      "Leaderboard and trading-ranking system computed from simulated PnL.",
      "Responsive dark-themed UI built with React + TypeScript, deployed on Vercel.",
    ],
    image: sonarTrading1,
    screenshots: [sonarTrading1, sonarTrading3, sonarTrading2],
    tags: ["React", "TypeScript", "WebSocket", "Binance API", "System Design", "Message Queue", "Message Broker", "Event-Driven Architecture", "Paper Trading"],
    links: [
      { label: "sonar-trading.vercel.app", url: "https://sonar-trading.vercel.app/" },
    ],
  },
  {
    title: "MeyReal - PTO Platform",
    role: "Full Stack Developer",
    period: "10/2025 - Present",
    description:
      "Real estate tokenization dApp — invest in real-world rental properties through Property Token Offerings (PTO) with tokenized ownership and recurring rental yield.",
    about:
      "MeyReal is the RWA dApp of the MEY ecosystem: real-world rental properties in Vietnam are tokenized and offered through PTOs, so anyone can co-own a property, earn recurring rental yield and trade tokenized ownership on-chain. I work end-to-end — smart contracts, backend indexing services and the dApp frontend — with system architecture designed to keep off-chain state consistent with on-chain events.",
    keyFeatures: [
      "Property Token Offering (PTO) contracts: tokenized ownership, allocation, co-owner tracking and claim flows (ERC-20/721 + custom).",
      "Rental PTO with recurring rental yield distribution to token holders.",
      "Staking, Portfolio, Referral Program and Booster Program modules.",
      "Nest.js backend services for off-chain data processing, indexing and synchronization with on-chain state.",
      "Subgraph/indexing systems enabling efficient on-chain queries for real-time analytics.",
      "Contract reviews, gas optimization and security hardening with external audits (Certik, SolidProof).",
    ],
    image: meyReal1,
    screenshots: [meyReal1, meyReal2],
    tags: ["Solidity", "Nest.js", "Base", "RWA", "PTO"],
    team: 10,
    links: [
      { label: "meyreal.io", url: "https://meyreal.io/" },
      { label: "app.meyreal.io/pto", url: "https://app.meyreal.io/pto" },
    ],
  },
  {
    title: "MeyFi",
    role: "Full Stack Developer",
    period: "10/2025 - Present",
    description:
      "DeFi staking platform of the MEY ecosystem — secure staking, rewards and affiliate program, live on Base mainnet.",
    about:
      "The DeFi arm of the MEY ecosystem: a staking platform for $MEY with rewards, vesting and an affiliate program, audited by Certik and live on Base mainnet. I build the staking smart contracts and the full-stack dApp around them.",
    keyFeatures: [
      "Staking pool smart contracts with reward distribution, lock terms and vesting schedules.",
      "Scalable DeFi architecture: staking pools, liquidity management and yield distribution.",
      "Real-time on-chain stats (price, supply, market cap, holders, transactions) via indexing services.",
      "Affiliate/referral program with on-chain reward tracking.",
      "Wallet connect flows and transaction UX for staking, claiming and unstaking.",
      "Certik audit & compliance for high-value financial transactions.",
    ],
    image: meyFi1,
    screenshots: [meyFi1, meyFi2],
    tags: ["Solidity", "Nest.js", "Base", "DeFi", "Staking"],
    team: 10,
    links: [{ label: "meyfi.io", url: "https://meyfi.io/" }],
  },
  {
    title: "Ventory",
    role: "Full Stack Developer - Blockchain Engineer",
    period: "03/2024 - 10/2025",
    description:
      "NFT Marketplace + DEX + Memecoin.Fun + Multi-chain. Smart contract programming, contract calls with Next.js, storage solutions and project operations.",
    about:
      "A multi-chain NFT marketplace, DEX and Memecoin.Fun platform spanning Solana, Sui, Starknet and EVM chains. I built smart contracts across four languages and the full-stack integration layer that lets one product run on very different chain architectures.",
    keyFeatures: [
      "Smart contracts in Rust (Solana), Move (Sui/Aptos), Solidity (EVM) and Cairo (Starknet).",
      "NFT marketplace, launchpad, AMM/DEX and memecoin-fun mechanics across chains.",
      "Next.js frontend with per-chain contract-call adapters and wallet integrations.",
      "Indexing and data services powering scalable, efficient dApp queries.",
      "Storage solutions for NFT assets and metadata.",
      "Project operations: ecosystem applications, fundraising and community coordination.",
    ],
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
    about:
      "One of the leading NFT marketplaces and DEXs on Sui, plus MovePump — a memecoin launch platform. I developed Move smart contracts and the Next.js integration layer, including trading bot tooling.",
    keyFeatures: [
      "Move smart contracts for NFT marketplace, DEX swaps and memecoin launchpad (movepump.com).",
      "Bonding-curve token launch mechanics with automatic liquidity migration.",
      "Next.js frontend with Sui wallet integration and on-chain contract calls.",
      "Trading bot for automated interactions on Sui.",
      "High-throughput handling of trading and minting events on Sui's object-centric model.",
    ],
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
    about:
      "A fully onchain game on Starknet — all game state and logic live in smart contracts. I wrote the Cairo contracts on the Dojo engine (ECS architecture) and connected them to the TypeScript game client.",
    keyFeatures: [
      "Cairo smart contracts holding the entire game state and rules onchain.",
      "Dojo engine with Entity-Component-System (ECS) architecture for onchain game logic.",
      "Torii indexer integration for real-time game-state queries from the client.",
      "TypeScript client connected to Starknet for transactions and state sync.",
      "Winner of the Starknet Winter Hackathon (01/2025).",
    ],
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
    about:
      "An NFT marketplace built on the Wyvern Protocol (the engine behind OpenSea). I implemented the ERC721/ERC1155 contracts with on-chain metadata and the frontend contract integration.",
    keyFeatures: [
      "Wyvern Protocol order matching for listings, bids and atomic swaps.",
      "ERC721/ERC1155 contracts with OpenZeppelin and on-chain metadata.",
      "Comprehensive Hardhat test suite in Solidity + TypeScript.",
      "EVM deployment and gas optimization across Ethereum, Polygon and BSC.",
      "Next.js integration with Web3.js/Ethers.js and NFT storage solutions.",
    ],
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
    about:
      "A dual launchpad supporting both ICO (token) and INO (NFT) sales. I built the sale smart contracts and the React frontend integration on Ethereum and Arbitrum.",
    keyFeatures: [
      "ICO/INO sale contracts with whitelist, allocation caps and claim schedules.",
      "Vesting and distribution logic for token sales.",
      "React.js frontend with contract calls via Web3.js/Ethers.js.",
      "Deployed on Ethereum and Arbitrum.",
    ],
    image: project3,
    tags: ["Solidity", "React.js", "Ethereum", "Arbitrum"],
    team: 3,
    links: [
      { label: "sotatek.com/portfolio/ido-platform", url: "https://www.sotatek.com/portfolio/ido-platform/" },
    ],
  },
];

/* ------------------------------ APPS ------------------------------- */
export const appStore = {
  heading: "Mobile Apps",
  subheading: "Mobile apps I designed, built with React Native and published on the App Store",
  developerName: "Nguyen Viet Tri",
  developerUrl: "https://apps.apple.com/us/developer/nguyen-viet-tri/id6780534675",
};
export type AppItem = {
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: string;
  platform: string;
  tags: string[];
  url?: string;
  image?: string;
  comingSoon?: boolean;
};
export const apps: AppItem[] = [
  {
    name: "Gia Phả Đất Việt",
    tagline: "Kết nối các thế hệ, gìn giữ cội nguồn cho con cháu mai sau",
    description:
      "A Vietnamese family-tree app to build and preserve multi-generational genealogy. Create interactive lineage records with detailed profiles, manage family relationships and share with customizable privacy controls.",
    category: "Lifestyle",
    price: "Free",
    platform: "iOS",
    tags: ["iOS", "React Native", "Genealogy", "Family Tree"],
    url: "https://apps.apple.com/us/app/gia-pha-dat-viet/id6780534673",
    image: giaPhaDatVietIcon,
  },
  {
    name: "XuXu",
    tagline: "Hoàn tiền mua sắm đến 20% — Shopee, TikTok Shop, Lazada, Tiki",
    description:
      "A cashback & affiliate shopping app — paste a product link from Shopee, TikTok Shop, Lazada or Tiki and earn cashback on every purchase. Coins, vouchers, daily check-in streaks, lucky wheel, referral rewards and VIP tiers.",
    category: "Shopping",
    price: "Free",
    platform: "iOS",
    tags: ["React Native", "Cashback", "Affiliate", "E-commerce"],
    comingSoon: true,
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
    icon: Network,
    title: "System Design & Architecture",
    skills: [
      { name: "Microservices & Event-Driven Architecture", level: 75 },
      { name: "Message Queues (Kafka, RabbitMQ, BullMQ)", level: 72 },
      { name: "REST API, Webhooks & GraphQL", level: 80 },
      { name: "High-Volume Transaction Processing", level: 74 },
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
    icon: Code2,
    title: "Frontend",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 93 },
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 45 },
    ],
  },
  {
    icon: Database,
    title: "Database & Caching",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "Redis (Cache, Queue, Pub/Sub)", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Prisma ORM", level: 85 },
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
    icon: Boxes,
    title: "Blockchain & Web3",
    skills: [
      { name: "Solidity", level: 95 },
      { name: "Rust / Move / Cairo", level: 82 },
      { name: "Ethers.js / Web3.js / Viem", level: 92 },
      { name: "Subgraph / Indexing", level: 85 },
    ],
  },
  {
    icon: Sparkles,
    title: "AI Engineering & Tools",
    skills: [
      { name: "Claude Code / Codex / Cursor", level: 90 },
      { name: "MCP & AI Agents", level: 85 },
      { name: "Docker / AWS", level: 85 },
      { name: "CI/CD & Git", level: 85 },
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
  image?: string;
};
export const awards: Award[] = [
  {
    title: "Starknet Winter Hackathon",
    date: "01/2025",
    link: "https://app.buidlbox.io/starknet/starknet-winter/overview",
  },
  { title: "First Prize of MCI Competition - The Expert Coder 2021", date: "08/2021" },
  {
    title: "Third Prize - ACM/ICPC University Competition",
    date: "10/2019",
    image: certAcmIcpc,
  },
  {
    title: "Data Science with Facebook Developer Circles",
    date: "10/2019",
    image: certFacebookDataScience,
  },
];

/* ---------------------------- OTHER SKILLS ------------------------- */
export const otherSkills: string[] = [
  "Continuously learning system design: distributed systems, message queues, event-driven and high-throughput architectures",
  "Studying algorithms and data structures to write efficient, scalable code",
  "Researching trading systems: matching engines, real-time market data pipelines and risk management",
  "Following the blockchain ecosystem: new chains, DeFi protocols and emerging smart contract languages",
  "Strong self-learning and problem-solving mindset",
  "Proficient with Linux, Git and modern development workflows",
  "Able to read and work with technical documents in English",
];

/* ----------------------------- NAV --------------------------------- */
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Apps", href: "#apps" },
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
