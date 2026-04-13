# SAARZ International — Website

The official website for **SAARZ International**, a digital solutions company specializing in web development, mobile apps, AI solutions, and cloud infrastructure.

Built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/
│   ├── blog/
│   ├── careers/
│   ├── contact/
│   ├── our-team/
│   ├── our-work/
│   ├── services/
│   │   └── [slug]/       # Dynamic service detail pages
│   ├── layout.tsx
│   └── page.tsx          # Home page
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Home page sections (Hero, Partners, etc.)
│   └── ui/               # Reusable UI components
└── data/
    └── site-data.ts      # Centralized site content
```

## Pages

- **Home** — Hero, partners, services preview, testimonials, CTA
- **About** — Company story, core values, stats
- **Services** — All service categories + dynamic detail pages
- **Our Work** — Portfolio with filtering and lightbox
- **Our Team** — Team member profiles
- **Blog** — Article listings
- **Contact** — Contact form with validation
- **Careers** — Job listings with application dialogs

## Deployment

Deploy easily on [Vercel](https://vercel.com/new).

```bash
npm run build
```

## License

© SAARZ International. All rights reserved.
