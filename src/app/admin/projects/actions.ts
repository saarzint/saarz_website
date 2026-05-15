"use server";

import { db, schema } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { categoryKey, normalizeCategory, slugify } from "@/lib/utils";
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

function normalizeRequestedOrder(sortOrder: number) {
  if (!Number.isFinite(sortOrder)) return 0;
  return Math.max(0, Math.trunc(sortOrder));
}

async function reorderProjects(targetProjectId: string, desiredOrder: number) {
  const rows = await db
    .select({ id: schema.projects.id })
    .from(schema.projects)
    .orderBy(asc(schema.projects.sortOrder), asc(schema.projects.createdAt));

  const orderedIds = rows
    .map((row) => row.id)
    .filter((id) => id !== targetProjectId);
  const targetIndex = Math.min(Math.max(desiredOrder, 0), orderedIds.length);
  orderedIds.splice(targetIndex, 0, targetProjectId);

  for (const [index, id] of orderedIds.entries()) {
    await db
      .update(schema.projects)
      .set({ sortOrder: index, updatedAt: new Date() })
      .where(eq(schema.projects.id, id));
  }
}

async function compactProjectOrder() {
  const rows = await db
    .select({ id: schema.projects.id })
    .from(schema.projects)
    .orderBy(asc(schema.projects.sortOrder), asc(schema.projects.createdAt));

  for (const [index, row] of rows.entries()) {
    await db
      .update(schema.projects)
      .set({ sortOrder: index, updatedAt: new Date() })
      .where(eq(schema.projects.id, row.id));
  }
}

async function canonicalizeProjectCategory(category: string) {
  const cleaned = normalizeCategory(category);
  if (!cleaned) return cleaned;

  const rows = await db
    .select({ category: schema.projects.category })
    .from(schema.projects)
    .orderBy(asc(schema.projects.sortOrder), asc(schema.projects.createdAt));

  const existing = rows.find(
    (row) => categoryKey(row.category) === categoryKey(cleaned)
  );

  return existing?.category ?? cleaned;
}

export async function saveProject(data: ProjectFormData) {
  await requireAdmin();

  const slug = data.slug || slugify(data.name);
  const category = await canonicalizeProjectCategory(data.category);
  const requestedOrder = normalizeRequestedOrder(data.sortOrder);

  if (data.id) {
    await db
      .update(schema.projects)
      .set({
        slug,
        name: data.name,
        category,
        description: data.description,
        images: data.images,
        technologies: data.technologies,
        url: data.url || null,
        featured: data.featured,
        updatedAt: new Date(),
      })
      .where(eq(schema.projects.id, data.id));

    await reorderProjects(data.id, requestedOrder);
  } else {
    const [created] = await db
      .insert(schema.projects)
      .values({
        slug,
        name: data.name,
        category,
        description: data.description,
        images: data.images,
        technologies: data.technologies,
        url: data.url || null,
        sortOrder: requestedOrder,
        featured: data.featured,
      })
      .returning({ id: schema.projects.id });

    await reorderProjects(created.id, requestedOrder);
  }

  updateTag("projects");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.delete(schema.projects).where(eq(schema.projects.id, id));
  await compactProjectOrder();
  updateTag("projects");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
}
