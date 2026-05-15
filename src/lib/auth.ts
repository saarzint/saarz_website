import "server-only";
import { createSupabaseServerClient } from "./supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}
