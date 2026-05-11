import { createSupabaseAdminClient } from "./supabase/admin";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "saarzint-media";

export async function uploadImage(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const supabase = createSupabaseAdminClient();
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, {
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filename);

  return publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  // Extract path from full public URL
  const match = url.match(new RegExp(`/${BUCKET}/(.+)$`));
  if (!match) return;
  await supabase.storage.from(BUCKET).remove([match[1]]);
}
