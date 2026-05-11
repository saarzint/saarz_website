"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

interface ServiceFormData {
  id?: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  sortOrder: number;
  active: boolean;
}

export async function saveService(data: ServiceFormData) {
  await requireAdmin();

  const slug = data.slug || slugify(data.title);

  if (data.id) {
    await db
      .update(schema.services)
      .set({
        slug,
        title: data.title,
        shortTitle: data.shortTitle,
        description: data.description,
        icon: data.icon,
        image: data.image,
        features: data.features,
        sortOrder: data.sortOrder,
        active: data.active,
        updatedAt: new Date(),
      })
      .where(eq(schema.services.id, data.id));
  } else {
    await db.insert(schema.services).values({
      slug,
      title: data.title,
      shortTitle: data.shortTitle,
      description: data.description,
      icon: data.icon,
      image: data.image,
      features: data.features,
      sortOrder: data.sortOrder,
      active: data.active,
    });
  }

  updateTag("services");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await db.delete(schema.services).where(eq(schema.services.id, id));
  updateTag("services");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}
