import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext(null);

// ─── helpers ────────────────────────────────────────────────────────────────

// Read role straight from the JWT's app_metadata — zero network calls.
function getRoleFromUser(user) {
  return user?.app_metadata?.role ?? null;
}

// ─── provider ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const u = session?.user ?? null;

        if (event === 'INITIAL_SESSION') {
          setUser(u);
          // If user exists but JWT has no role yet (old session before
          // app_metadata migration), refresh to get an updated token.
          if (u && !u.app_metadata?.role) {
            supabase.auth.refreshSession().then(({ data }) => {
              if (data?.user) setUser(data.user);
              setLoading(false);
            });
            return;
          }
          setLoading(false);
          return;
        }

        if (event === 'SIGNED_IN') {
          setUser(u);
          setLoading(false);
          return;
        }

        if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
          return;
        }

        // TOKEN_REFRESHED, USER_UPDATED, etc.
        setUser(u);
      }
    );

    // Safety net: if INITIAL_SESSION never fires, unblock after 5 s.
    const safetyNet = setTimeout(() => {
      setLoading((prev) => {
        if (prev) console.warn('[AuthContext] safety-net: forcing loading=false');
        return false;
      });
    }, 5_000);

    return () => {
      clearTimeout(safetyNet);
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  // All derived from JWT — instant, no network.
  const role     = getRoleFromUser(user);
  const isAdmin  = role === 'admin';
  const isClient = role === 'client';
  const profile  = user ? { id: user.id, email: user.email, role } : null;

  return (
    <AuthContext.Provider
      value={{ user, profile, role, isAdmin, isClient, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
