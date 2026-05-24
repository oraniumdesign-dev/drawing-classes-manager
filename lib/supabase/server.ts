import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-side client — uses service role key to bypass RLS
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
