-- ─── Initial schema for SAARZ Int. CMS ───
-- Run this manually in Supabase SQL Editor (SQL Editor → New query → paste → Run)
-- Or use: npx drizzle-kit push (requires DATABASE_URL set)

CREATE TABLE IF NOT EXISTS "blog_posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "content" text NOT NULL DEFAULT '',
  "cover_image" text,
  "author" text NOT NULL DEFAULT 'SAARZ Team',
  "read_time" integer NOT NULL DEFAULT 5,
  "tags" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "published" boolean NOT NULL DEFAULT false,
  "published_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "services" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL,
  "short_title" text NOT NULL,
  "description" text NOT NULL,
  "icon" text NOT NULL,
  "image" text NOT NULL,
  "features" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "sort_order" integer NOT NULL DEFAULT 0,
  "active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "category" text NOT NULL,
  "description" text NOT NULL,
  "images" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "technologies" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "url" text,
  "sort_order" integer NOT NULL DEFAULT 0,
  "featured" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "team_members" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "role" text NOT NULL,
  "image" text,
  "bio" text NOT NULL DEFAULT '',
  "linkedin" text,
  "twitter" text,
  "sort_order" integer NOT NULL DEFAULT 0,
  "active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "testimonials" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "role" text,
  "company" text,
  "image" text,
  "text" text NOT NULL,
  "rating" integer NOT NULL DEFAULT 5,
  "sort_order" integer NOT NULL DEFAULT 0,
  "active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "jobs" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "type" text NOT NULL,
  "location" text NOT NULL,
  "department" text NOT NULL,
  "description" text NOT NULL,
  "requirements" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "open" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "site_settings" (
  "key" text PRIMARY KEY,
  "value" jsonb NOT NULL,
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS "blog_posts_published_idx" ON "blog_posts" ("published", "published_at" DESC);
CREATE INDEX IF NOT EXISTS "services_sort_idx" ON "services" ("sort_order");
CREATE INDEX IF NOT EXISTS "projects_sort_idx" ON "projects" ("sort_order");
CREATE INDEX IF NOT EXISTS "team_sort_idx" ON "team_members" ("sort_order");
CREATE INDEX IF NOT EXISTS "testimonials_sort_idx" ON "testimonials" ("sort_order");

-- ─── Row Level Security ─────────────────────────────────────────
-- Public can read; only authenticated users (admins) can write.
-- Service-role key bypasses RLS, so seed scripts and admin server actions still work.

ALTER TABLE "blog_posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "services" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "team_members" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "testimonials" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "site_settings" ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_blog" ON "blog_posts" FOR SELECT USING (published = true);
CREATE POLICY "public_read_services" ON "services" FOR SELECT USING (active = true);
CREATE POLICY "public_read_projects" ON "projects" FOR SELECT USING (true);
CREATE POLICY "public_read_team" ON "team_members" FOR SELECT USING (active = true);
CREATE POLICY "public_read_testimonials" ON "testimonials" FOR SELECT USING (active = true);
CREATE POLICY "public_read_jobs" ON "jobs" FOR SELECT USING (open = true);
CREATE POLICY "public_read_settings" ON "site_settings" FOR SELECT USING (true);

-- Authenticated full access
CREATE POLICY "auth_all_blog" ON "blog_posts" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_services" ON "services" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_projects" ON "projects" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_team" ON "team_members" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_testimonials" ON "testimonials" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_jobs" ON "jobs" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_settings" ON "site_settings" FOR ALL USING (auth.role() = 'authenticated');
