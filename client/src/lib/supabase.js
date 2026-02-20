import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use sessionStorage instead of localStorage.
    // Tokens are scoped to the browser tab/session — they vanish when the
    // browser is closed, eliminating the long-lived token-in-localStorage
    // attack surface. For HttpOnly cookie security (XSS-proof) you would
    // need an SSR framework (Next.js + @supabase/ssr), but sessionStorage
    // is the correct step for a Vite SPA going to production.
    storage:           window.sessionStorage,
    persistSession:    true,
    autoRefreshToken:  true,
    detectSessionInUrl: true,
  },
});
