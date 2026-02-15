import { createClient } from "@supabase/supabase-js";
// Here Client Nothing but  Which have the Access of the Supabbase like Baceknd connections 

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);