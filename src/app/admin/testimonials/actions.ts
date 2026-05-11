"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

interface TestimonialFormData {
  id?: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  sortOrder: number;
  active: boolean;
}

export async function saveTestimonial(data: TestimonialFormData) {
  await requireAdmin();

  if (data.id) {
    await db
      .update(schema.testimonials)
      .set({
        name: data.name,
        role: data.role || null,
        company: data.company || null,
        image: data.image || null,
        text: data.text,
        rating: data.rating,
        sortOrder: data.sortOrder,
        active: data.active,
        updatedAt: new Date(),
      })
      .where(eq(schema.testimonials.id, data.id));
  } else {
    await db.insert(schema.testimonials).values({
      name: data.name,
      role: data.role || null,
      company: data.company || null,
      image: data.image || null,
      text: data.text,
      rating: data.rating,
      sortOrder: data.sortOrder,
      active: data.active,
    });
  }

  updateTag("testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));
  updateTag("testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
