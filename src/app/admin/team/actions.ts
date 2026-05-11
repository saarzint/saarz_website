"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

interface TeamFormData {
  id?: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  twitter: string;
  sortOrder: number;
  active: boolean;
}

export async function saveTeamMember(data: TeamFormData) {
  await requireAdmin();

  if (data.id) {
    await db
      .update(schema.teamMembers)
      .set({
        name: data.name,
        role: data.role,
        image: data.image || null,
        bio: data.bio,
        linkedin: data.linkedin || null,
        twitter: data.twitter || null,
        sortOrder: data.sortOrder,
        active: data.active,
        updatedAt: new Date(),
      })
      .where(eq(schema.teamMembers.id, data.id));
  } else {
    await db.insert(schema.teamMembers).values({
      name: data.name,
      role: data.role,
      image: data.image || null,
      bio: data.bio,
      linkedin: data.linkedin || null,
      twitter: data.twitter || null,
      sortOrder: data.sortOrder,
      active: data.active,
    });
  }

  updateTag("team");
  revalidatePath("/about");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await db.delete(schema.teamMembers).where(eq(schema.teamMembers.id, id));
  updateTag("team");
  revalidatePath("/about");
  revalidatePath("/admin/team");
}
