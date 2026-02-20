import { createClient } from '@supabase/supabase-js';

// Trim whitespace and ensure https:// prefix so a missing protocol in the
// Vercel env var doesn't cause a silent "Invalid value" fetch error at runtime.
function normalizeUrl(raw) {
  if (!raw) return '';
  const trimmed = raw.trim().replace(/\/+$/, ''); // strip trailing slashes
  if (trimmed && !trimmed.startsWith('http')) return `https://${trimmed}`;
  return trimmed;
}

const supabaseUrl     = normalizeUrl(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

// Validate that the URL is actually absolute so we surface a clear message
// instead of the cryptic "Invalid value" fetch error.
try { new URL(supabaseUrl); } catch {
  throw new Error(`VITE_SUPABASE_URL is not a valid URL: "${supabaseUrl}"`);
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
