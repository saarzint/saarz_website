"use server";

import { db, schema } from "@/lib/db";
import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export interface ContactSettings {
  email: string;
  phone: string;
  address: string;
}

export interface SocialSettings {
  linkedin: string;
  facebook: string;
  upwork: string;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  ceo: string;
}

interface SiteSettingsPayload {
  contact: ContactSettings;
  social: SocialSettings;
  company: CompanySettings;
}

export async function saveSiteSettings(data: SiteSettingsPayload) {
  await requireAdmin();

  const entries: Array<{ key: string; value: unknown }> = [
    { key: "contact", value: data.contact },
    { key: "social", value: data.social },
    { key: "company", value: data.company },
  ];

  for (const entry of entries) {
    await db
      .insert(schema.siteSettings)
      .values({
        key: entry.key,
        value: entry.value,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.siteSettings.key,
        set: {
          value: entry.value,
          updatedAt: new Date(),
        },
      });
  }

  updateTag("site-settings");
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
