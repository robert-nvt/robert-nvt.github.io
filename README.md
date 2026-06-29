<div align="center">

# Nguyen Viet Tri — Portfolio

### FullStack Developer & Blockchain Engineer

Building scalable full-stack, blockchain (RWA, DeFi, NFT) and AI-driven commerce products.
Specialized in **Solidity**, **Node.js**, **Next.js**, and global **payment infrastructure**.

[![Live Site](https://img.shields.io/badge/Live-robert--nvt.github.io-6d28d9?style=for-the-badge)](https://robert-nvt.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-robert--nvt-181717?style=for-the-badge&logo=github)](https://github.com/robert-nvt)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-tringuyenviet-0a66c2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/tringuyenviet/)

</div>

---

## ✨ Overview

A modern, highly animated personal portfolio — an interactive online resume with a 3D hero,
scroll-driven parallax, animated timeline, and project showcase. All content is driven from a
**single source of truth** ([`src/data/resume.ts`](src/data/resume.ts)), so updating the CV never
requires touching component code.

## 🚀 Features

- **3D Hero Section** — pointer-driven tilt card with multi-layer parallax background
- **Scroll-Driven Animations** — reveal-on-scroll depth layers for a futuristic feel
- **Experience Timeline** — animated vertical timeline of roles & achievements
- **Projects Showcase** — image-rich cards with 3D hover effects and modal previews
- **Skills Section** — animated radial charts and progress bars
- **Downloadable CV** — one-click PDF download
- **Fully Responsive** — optimized for desktop, tablet, and mobile
- **Accessible** — ARIA roles, keyboard navigation, `prefers-reduced-motion` support

## 🛠️ Tech Stack

| Area        | Technologies                                                        |
| ----------- | ------------------------------------------------------------------- |
| Framework   | [React 18](https://react.dev) + [TypeScript](https://typescriptlang.org) |
| Build Tool  | [Vite 5](https://vitejs.dev)                                        |
| Styling     | [Tailwind CSS](https://tailwindcss.com) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| UI Primitives | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| Routing     | [React Router](https://reactrouter.com)                            |
| Data / Forms | [TanStack Query](https://tanstack.com/query), [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Charts      | [Recharts](https://recharts.org)                                    |
| Icons       | [Lucide](https://lucide.dev)                                        |

## 📦 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:8080)
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Type-check and bundle for production      |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint across the project             |

## 📁 Project Structure

```
.
├── public/                 # Static assets served as-is
├── src/
│   ├── assets/             # Images (profile, projects, hero)
│   ├── components/         # Page sections (Hero, Experience, Projects, Skills…)
│   │   └── ui/             # shadcn/ui primitives
│   ├── data/
│   │   └── resume.ts       # ⭐ Single source of truth — edit your CV here
│   ├── files/              # Downloadable CV (PDF)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   ├── pages/              # Route pages
│   ├── App.tsx             # App shell & routing
│   └── main.tsx            # Entry point
├── index.html
├── tailwind.config.ts
└── vite.config.ts
```

## ✏️ Customization

All personal content lives in **[`src/data/resume.ts`](src/data/resume.ts)** — profile, about,
stats, experience, projects, skills, education, and contact details. Update that one file and the
whole site reflects the changes.

## 🌐 Deployment

The site auto-deploys to **GitHub Pages** on every push to `main` via
[GitHub Actions](.github/workflows/deploy.yml).

---

<div align="center">

📫 **Get in touch** — [tri.nv.cntt@gmail.com](mailto:tri.nv.cntt@gmail.com)

Made with ❤️ by Nguyen Viet Tri

</div>
