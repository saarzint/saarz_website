/**
 * Public content fetchers.
 * Reads from Supabase via Drizzle when DATABASE_URL is configured.
 * Falls back to static site-data.ts when DB is unavailable (during dev/setup).
 */
import { db, schema } from "@/lib/db";
import { eq, desc, asc, and } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import * as staticData from "@/data/site-data";

const DB_CONFIGURED =
  !!process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes("placeholder");

// ─── Services ──
export const getServices = cache(
  async () => {
    if (!DB_CONFIGURED) return staticData.services;
    try {
      const rows = await db
        .select()
        .from(schema.services)
        .where(eq(schema.services.active, true))
        .orderBy(asc(schema.services.sortOrder));
      return rows.length ? rows : staticData.services;
    } catch {
      return staticData.services;
    }
  },
  ["services"],
  { tags: ["services"] }
);

export async function getServiceBySlug(slug: string) {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

// ─── Projects ──
export const getProjects = cache(
  async () => {
    if (!DB_CONFIGURED) return staticData.projects;
    try {
      const rows = await db
        .select()
        .from(schema.projects)
        .orderBy(asc(schema.projects.sortOrder));
      if (rows.length === 0) return staticData.projects;
      // Map DB row → shape used by ProjectCard / OurWorkPage
      return rows.map((r) => ({
        id: r.slug,
        name: r.name,
        category: r.category,
        description: r.description,
        images: r.images,
        technologies: r.technologies,
      }));
    } catch {
      return staticData.projects;
    }
  },
  ["projects"],
  { tags: ["projects"] }
);

// ─── Team ──
export const getTeamMembers = cache(
  async () => {
    if (!DB_CONFIGURED) return staticData.teamMembers;
    try {
      const rows = await db
        .select()
        .from(schema.teamMembers)
        .where(eq(schema.teamMembers.active, true))
        .orderBy(asc(schema.teamMembers.sortOrder));
      if (rows.length === 0) return staticData.teamMembers;
      return rows.map((r) => ({
        name: r.name,
        role: r.role,
        image: r.image || "",
        bio: r.bio,
        linkedin: r.linkedin || "#",
      }));
    } catch {
      return staticData.teamMembers;
    }
  },
  ["team"],
  { tags: ["team"] }
);

// ─── Testimonials ──
export const getTestimonials = cache(
  async () => {
    if (!DB_CONFIGURED) return staticData.testimonials;
    try {
      const rows = await db
        .select()
        .from(schema.testimonials)
        .where(eq(schema.testimonials.active, true))
        .orderBy(asc(schema.testimonials.sortOrder));
      if (rows.length === 0) return staticData.testimonials;
      return rows.map((r) => ({
        name: r.name,
        text: r.text,
        rating: r.rating,
        image: r.image || "",
      }));
    } catch {
      return staticData.testimonials;
    }
  },
  ["testimonials"],
  { tags: ["testimonials"] }
);

// ─── Jobs ──
export const getJobs = cache(
  async () => {
    if (!DB_CONFIGURED) return null;
    try {
      const rows = await db
        .select()
        .from(schema.jobs)
        .where(eq(schema.jobs.open, true))
        .orderBy(desc(schema.jobs.createdAt));
      return rows;
    } catch {
      return null;
    }
  },
  ["jobs"],
  { tags: ["jobs"] }
);

// ─── Blog Posts ──
export const getBlogPosts = cache(
  async () => {
    if (!DB_CONFIGURED) return staticData.blogPosts;
    try {
      const rows = await db
        .select()
        .from(schema.blogPosts)
        .where(eq(schema.blogPosts.published, true))
        .orderBy(desc(schema.blogPosts.publishedAt));
      if (rows.length === 0) return staticData.blogPosts;
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        description: r.description,
        author: r.author,
        date: (r.publishedAt ?? r.createdAt).toISOString(),
        readTime: r.readTime,
        image: r.coverImage || "/pics/blog-images/blog01.jpg",
        tags: r.tags,
      }));
    } catch {
      return staticData.blogPosts;
    }
  },
  ["blog-posts"],
  { tags: ["blog-posts"] }
);

export async function getBlogPostBySlug(slug: string) {
  if (!DB_CONFIGURED) return null;
  try {
    const [row] = await db
      .select()
      .from(schema.blogPosts)
      .where(
        and(
          eq(schema.blogPosts.slug, slug),
          eq(schema.blogPosts.published, true)
        )
      )
      .limit(1);
    return row ?? null;
  } catch {
    return null;
  }
}

// ─── Site Settings ──
export const getSiteSettings = cache(
  async () => {
    if (!DB_CONFIGURED) {
      return {
        contact: staticData.siteConfig.contact,
        social: staticData.siteConfig.social,
        company: {
          name: staticData.siteConfig.name,
          tagline: staticData.siteConfig.tagline,
          description: staticData.siteConfig.description,
          founded: staticData.siteConfig.founded,
          ceo: staticData.siteConfig.ceo,
        },
      };
    }
    try {
      const rows = await db.select().from(schema.siteSettings);
      const grouped: Record<string, unknown> = {};
      for (const row of rows) grouped[row.key] = row.value;
      return {
        contact: (grouped.contact as typeof staticData.siteConfig.contact) ??
          staticData.siteConfig.contact,
        social: (grouped.social as typeof staticData.siteConfig.social) ??
          staticData.siteConfig.social,
        company:
          (grouped.company as {
            name: string;
            tagline: string;
            description: string;
            founded: number;
            ceo: string;
          }) ?? {
            name: staticData.siteConfig.name,
            tagline: staticData.siteConfig.tagline,
            description: staticData.siteConfig.description,
            founded: staticData.siteConfig.founded,
            ceo: staticData.siteConfig.ceo,
          },
      };
    } catch {
      return {
        contact: staticData.siteConfig.contact,
        social: staticData.siteConfig.social,
        company: {
          name: staticData.siteConfig.name,
          tagline: staticData.siteConfig.tagline,
          description: staticData.siteConfig.description,
          founded: staticData.siteConfig.founded,
          ceo: staticData.siteConfig.ceo,
        },
      };
    }
  },
  ["site-settings"],
  { tags: ["site-settings"] }
);
