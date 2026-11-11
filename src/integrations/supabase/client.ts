import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Browser-safe Supabase client. It uses the publishable key, so row-level
 * security decides what it may read and write (see supabase/migrations).
 */
function createSupabaseClient() {
  // VITE_* values are baked in at build time; process.env is the fallback on a server.
  const server = typeof process !== "undefined" ? process.env : undefined;
  const url = import.meta.env.VITE_SUPABASE_URL || server?.SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || server?.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createClient<Database>(url, key, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let client: ReturnType<typeof createSupabaseClient> | undefined;

// Created on first use, so importing this module never fails when the variables are missing.
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    client ??= createSupabaseClient();
    return Reflect.get(client, prop, receiver);
  },
});
