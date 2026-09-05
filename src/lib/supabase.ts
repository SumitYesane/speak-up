import { createClient } from "@supabase/supabase-js";

const configuredSupabaseUrl = import.meta.env["VITE_SUPABASE_URL"] ?? "";
const supabaseUrl = configuredSupabaseUrl
  .replace(/\/+$/, "")
  .replace(/\/rest\/v1$/i, "");
const supabasePublishableKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? "";

export const supabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabasePublishableKey || "placeholder-publishable-key",
);
