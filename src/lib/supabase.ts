import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseUrl.startsWith('http') && (supabaseAnonKey || supabaseServiceRoleKey));
};

// Client for read queries (safe for client and server)
export const supabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey || supabaseServiceRoleKey)
  : null;

// Server-side client with admin / service role privileges
export const getSupabaseAdmin = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const key = supabaseServiceRoleKey || supabaseAnonKey;
  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

