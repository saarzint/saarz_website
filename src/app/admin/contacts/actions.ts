"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export async function updateSubmissionStatus(id: string, status: string) {
  await requireAdmin();
  await db
    .update(schema.contactSubmissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(schema.contactSubmissions.id, id));
  revalidatePath("/admin/contacts");
  revalidatePath(`/admin/contacts/${id}`);
}

export async function deleteSubmission(id: string) {
  await requireAdmin();
  await db
    .delete(schema.contactSubmissions)
    .where(eq(schema.contactSubmissions.id, id));
  revalidatePath("/admin/contacts");
  redirect("/admin/contacts");
}
