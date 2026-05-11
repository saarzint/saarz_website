"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

interface ProjectFormData {
  id?: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  technologies: string[];
  url: string;
  sortOrder: number;
  featured: boolean;
}

export async function saveProject(data: ProjectFormData) {
  await requireAdmin();

  const slug = data.slug || slugify(data.name);

  if (data.id) {
    await db
      .update(schema.projects)
      .set({
        slug,
        name: data.name,
        category: data.category,
        description: data.description,
        images: data.images,
        technologies: data.technologies,
        url: data.url || null,
        sortOrder: data.sortOrder,
        featured: data.featured,
        updatedAt: new Date(),
      })
      .where(eq(schema.projects.id, data.id));
  } else {
    await db.insert(schema.projects).values({
      slug,
      name: data.name,
      category: data.category,
      description: data.description,
      images: data.images,
      technologies: data.technologies,
      url: data.url || null,
      sortOrder: data.sortOrder,
      featured: data.featured,
    });
  }

  updateTag("projects");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.delete(schema.projects).where(eq(schema.projects.id, id));
  updateTag("projects");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
}
