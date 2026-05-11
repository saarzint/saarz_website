import { createClient } from "@supabase/supabase-js";

/**
 * Admin client with service-role key. Bypasses RLS.
 * NEVER expose to the browser. Server-only.
 */
export function createSupabaseAdminClient() {
  // On Node < 22, supabase-realtime requires a WebSocket implementation.
  // We don't use realtime here, but the client still tries to initialize one.
  let transport: unknown = undefined;
  if (
    typeof process !== "undefined" &&
    process.versions?.node &&
    typeof globalThis.WebSocket === "undefined"
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      transport = require("ws");
    } catch {
      // ws not installed — realtime won't work but everything else will
    }
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      ...(transport
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { realtime: { transport: transport as any } }
        : {}),
    }
  );
}
