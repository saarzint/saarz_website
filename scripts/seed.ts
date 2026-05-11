import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local" });
import { db, schema } from "../src/lib/db";
import {
  services as serviceData,
  testimonials as testimonialData,
  projects as projectData,
  teamMembers as teamData,
  blogPosts as blogData,
  siteConfig,
} from "../src/data/site-data";

async function main() {
  console.log("🌱 Seeding database from site-data.ts...");

  // ─── Services ──
  console.log("→ services");
  for (let i = 0; i < serviceData.length; i++) {
    const s = serviceData[i];
    await db
      .insert(schema.services)
      .values({
        slug: s.slug,
        title: s.title,
        shortTitle: s.shortTitle,
        description: s.description,
        icon: s.icon,
        image: s.image,
        features: s.features,
        sortOrder: i,
        active: true,
      })
      .onConflictDoNothing();
  }

  // ─── Projects ──
  console.log("→ projects");
  for (let i = 0; i < projectData.length; i++) {
    const p = projectData[i];
    await db
      .insert(schema.projects)
      .values({
        slug: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        images: p.images,
        technologies: p.technologies,
        sortOrder: i,
      })
      .onConflictDoNothing();
  }

  // ─── Team Members ──
  console.log("→ team members");
  for (let i = 0; i < teamData.length; i++) {
    const m = teamData[i];
    await db
      .insert(schema.teamMembers)
      .values({
        name: m.name,
        role: m.role,
        image: m.image,
        bio: m.bio,
        linkedin: m.linkedin,
        sortOrder: i,
      })
      .onConflictDoNothing();
  }

  // ─── Testimonials ──
  console.log("→ testimonials");
  for (let i = 0; i < testimonialData.length; i++) {
    const t = testimonialData[i];
    await db
      .insert(schema.testimonials)
      .values({
        name: t.name,
        text: t.text,
        rating: t.rating,
        image: t.image,
        sortOrder: i,
      })
      .onConflictDoNothing();
  }

  // ─── Blog Posts ──
  console.log("→ blog posts");
  for (const post of blogData) {
    await db
      .insert(schema.blogPosts)
      .values({
        slug: post.slug,
        title: post.title,
        description: post.description,
        coverImage: post.image,
        author: post.author,
        readTime: post.readTime,
        tags: post.tags,
        published: true,
        publishedAt: new Date(post.date),
      })
      .onConflictDoNothing();
  }

  // ─── Site Settings ──
  console.log("→ site settings");
  await db
    .insert(schema.siteSettings)
    .values({ key: "contact", value: siteConfig.contact })
    .onConflictDoUpdate({
      target: schema.siteSettings.key,
      set: { value: siteConfig.contact, updatedAt: new Date() },
    });

  await db
    .insert(schema.siteSettings)
    .values({ key: "social", value: siteConfig.social })
    .onConflictDoUpdate({
      target: schema.siteSettings.key,
      set: { value: siteConfig.social, updatedAt: new Date() },
    });

  await db
    .insert(schema.siteSettings)
    .values({
      key: "company",
      value: {
        name: siteConfig.name,
        tagline: siteConfig.tagline,
        description: siteConfig.description,
        founded: siteConfig.founded,
        ceo: siteConfig.ceo,
      },
    })
    .onConflictDoUpdate({
      target: schema.siteSettings.key,
      set: {
        value: {
          name: siteConfig.name,
          tagline: siteConfig.tagline,
          description: siteConfig.description,
          founded: siteConfig.founded,
          ceo: siteConfig.ceo,
        },
        updatedAt: new Date(),
      },
    });

  console.log("✅ Seed complete");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
