import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Server-only Supabase client with the service role key. It bypasses row-level
 * security, so import it only from server functions and never from a component.
 */
function createSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase admin client is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

let client: ReturnType<typeof createSupabaseAdminClient> | undefined;

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    client ??= createSupabaseAdminClient();
    return Reflect.get(client, prop, receiver);
  },
});
