# SAARZ International — Website + Admin CMS

The official website for **SAARZ International**, with a built-in admin panel for managing blogs, services, projects, team members, testimonials, and job postings — all without code changes.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Database:** Supabase Postgres + Drizzle ORM
- **Auth:** Supabase Auth (email + password)
- **Storage:** Supabase Storage (image uploads)
- **Editor:** Tiptap (rich-text blog editor)
- **Icons:** Lucide React

## Quick Start

```bash
npm install
cp .env.example .env.local   # then fill in Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

## First-Time Setup (Supabase)

1. **Create a free Supabase project** at https://supabase.com
2. From **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret)
3. From **Project Settings → Database → Connection string**, copy the **Transaction pooler** URL → `DATABASE_URL`
4. Paste these into `.env.local`
5. **Run the schema migration** (one-time):

   Open Supabase SQL Editor → paste contents of `drizzle/0000_init.sql` → Run.
   Or: `npm run db:push` (uses Drizzle Kit).
6. **Create a storage bucket** named `saarzint-media`:
   - Supabase dashboard → **Storage** → New bucket → name: `saarzint-media` → **Public**
7. **Seed initial content** from `src/data/site-data.ts`:
   ```bash
   npm run db:seed
   ```
8. **Create an admin user**:
   ```bash
   npm run admin:create
   ```
9. Visit `/admin/login` and sign in.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:push` | Apply schema changes to DB |
| `npm run db:studio` | Open Drizzle Studio (DB GUI) |
| `npm run db:seed` | Seed DB from `site-data.ts` |
| `npm run admin:create` | Create a new admin user |

## Admin Panel

Located at `/admin/*` (protected by Supabase Auth).

| Section | Purpose |
| --- | --- |
| **Dashboard** | Content counts overview |
| **Blog Posts** | Rich-text editor, image uploads, draft/publish, tags |
| **Services** | All service categories shown on the public site |
| **Projects** | Portfolio entries with multi-image galleries |
| **Team** | Team member profiles |
| **Testimonials** | Client testimonials with ratings |
| **Jobs** | Open positions for the careers page |
| **Settings** | Contact info, social links, company info |

Edits are immediately live — no deployment needed (uses `updateTag` for revalidation).

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages (Navbar/Footer wrapper)
│   │   ├── page.tsx
│   │   ├── about/, services/, our-work/, our-team/, blog/, contact/, careers/
│   ├── admin/             # Admin panel (auth-protected)
│   │   ├── login/, blog/, services/, projects/, team/, testimonials/, jobs/, settings/
│   ├── api/admin/upload/  # Image upload endpoint
│   └── layout.tsx         # Root layout (no navbar/footer)
├── components/
│   ├── admin/             # Admin UI (Sidebar, RichEditor, ImageUpload)
│   ├── layout/            # Public Navbar, Footer
│   ├── sections/          # Hero, Partners, ServicesPreview, etc.
│   └── ui/                # Reusable UI (Button, ProjectCard, etc.)
├── lib/
│   ├── auth.ts            # requireAdmin() helper
│   ├── content.ts         # Public data fetchers (DB + static fallback)
│   ├── db/                # Drizzle schema + client
│   ├── storage.ts         # Supabase Storage helpers
│   ├── supabase/          # Server, client, admin Supabase clients
│   └── utils.ts           # slugify, etc.
├── data/site-data.ts      # Static fallback content
└── proxy.ts               # Auth middleware for /admin routes
drizzle/0000_init.sql      # Initial DB schema (run in Supabase SQL Editor)
scripts/
├── seed.ts                # Seed DB from site-data.ts
└── create-admin.ts        # Create admin users via CLI
```

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo on Vercel
3. Add the same environment variables in Vercel project settings
4. Deploy

Auto-deploys trigger on every push to `main`.

## License

© SAARZ International. All rights reserved.
