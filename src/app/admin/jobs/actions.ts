"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

interface JobFormData {
  id?: number;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  requirements: string[];
  open: boolean;
}

export async function saveJob(data: JobFormData) {
  await requireAdmin();

  if (data.id) {
    await db
      .update(schema.jobs)
      .set({
        title: data.title,
        type: data.type,
        location: data.location,
        department: data.department,
        description: data.description,
        requirements: data.requirements,
        open: data.open,
        updatedAt: new Date(),
      })
      .where(eq(schema.jobs.id, data.id));
  } else {
    await db.insert(schema.jobs).values({
      title: data.title,
      type: data.type,
      location: data.location,
      department: data.department,
      description: data.description,
      requirements: data.requirements,
      open: data.open,
    });
  }

  updateTag("jobs");
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

export async function deleteJob(id: number) {
  await requireAdmin();
  await db.delete(schema.jobs).where(eq(schema.jobs.id, id));
  updateTag("jobs");
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}
