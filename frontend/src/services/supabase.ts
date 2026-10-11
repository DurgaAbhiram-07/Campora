import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-project') && 
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

if (!isConfigured) {
  console.warn(
    'Supabase credentials missing or set to placeholder. Operating in local mode with mock data fallback.'
  );
}

// Dummy fallback URL/key to prevent createClient from throwing if unconfigured
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const supabase = createClient(
  isConfigured ? supabaseUrl : fallbackUrl,
  isConfigured ? supabaseAnonKey : fallbackKey
);

export const isSupabaseConfigured = isConfigured;
