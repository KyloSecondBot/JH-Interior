import { useState, useId, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Eye, EyeOff, LogIn, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuroraBackground from '@/components/reactbits/AuroraBackground';

// ── Spring easings generated with Motion MCP ─────────────────────────────────
const SPRING_CARD  = '700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1)';
const SPRING_FAST  = '250ms linear(0, 0.7049, 1.0618, 1.0314, 0.9973, 0.997, 1, 1)';
const SPRING_MED   = '350ms linear(0, 0.3772, 0.8604, 1.0738, 1.0846, 1.0353, 1.0006, 0.991, 0.9941, 0.9985, 1.0006, 1)';

// ── Animation variants ────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const errorVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.97,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

// ── Floating label input ──────────────────────────────────────────────────────
function FloatingInput({ id, label, type = 'text', value, onChange, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2.5 pt-5 text-sm text-white outline-none placeholder-transparent transition-colors duration-200 focus:border-amber-400/60 focus:bg-white/8 focus:ring-1 focus:ring-amber-400/30"
        placeholder={label}
        style={{ caretColor: '#fbbf24' }}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 select-none text-xs transition-all duration-200 ${
          active
            ? 'top-2 text-amber-400/80'
            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
        }`}
      >
        {label}
      </label>
      {/* focus glow */}
      <motion.div
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-amber-400/20 blur-sm"
      />
    </div>
  );
}

// ── Password input with toggle ────────────────────────────────────────────────
function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const id = useId();

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete="current-password"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-2.5 pt-5 pr-11 text-sm text-white outline-none placeholder-transparent transition-colors duration-200 focus:border-amber-400/60 focus:bg-white/8 focus:ring-1 focus:ring-amber-400/30"
        placeholder="Password"
        style={{ caretColor: '#fbbf24' }}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 select-none text-xs transition-all duration-200 ${
          active
            ? 'top-2 text-amber-400/80'
            : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
        }`}
      >
        Password
      </label>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(v => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors duration-150 hover:text-white/80"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      <motion.div
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-amber-400/20 blur-sm"
      />
    </div>
  );
}

// ── Role badge ────────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  admin:  { label: 'Admin',  color: 'text-amber-300 border-amber-400/30 bg-amber-400/10' },
  client: { label: 'Client', color: 'text-sky-300  border-sky-400/30   bg-sky-400/10'  },
  viewer: { label: 'Viewer', color: 'text-white/60 border-white/20    bg-white/5'      },
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { signIn, user, role, loading } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const reduce     = useReducedMotion();

  const from = location.state?.from?.pathname ?? '/dashboard';

  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [error,      setError]      = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect once auth + profile are both settled (loading=false).
  // loading is only true during INITIAL_SESSION and SIGNED_IN, so this
  // never fires until we actually know the user's role.
  useEffect(() => {
    if (!loading && user) {
      navigate(role === 'admin' ? '/dashboard' : '/', { replace: true });
    }
  }, [loading, user, role, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      // navigation handled by the useEffect above once role is loaded
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      // Always unblock the button — if signIn threw, catch already ran;
      // if it succeeded, navigation is imminent but the button should still unlock
      // in case something upstream (missing profile row, RLS) prevents the redirect.
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
      {/* ── Backgrounds ── */}
      <AuroraBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.10),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.04),transparent_55%)]" />

      {/* ── Back link ── */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-6 top-6 z-20"
      >
        <Link
          to="/"
          className="group flex items-center gap-1.5 text-xs text-white/40 transition-colors duration-150 hover:text-white/80"
        >
          <ArrowLeft size={14} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to site
        </Link>
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        variants={reduce ? {} : cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* card glow */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-amber-400/15 via-transparent to-transparent blur-sm" />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
          {/* top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <motion.div
            variants={reduce ? {} : stagger}
            initial="hidden"
            animate="visible"
          >
            {/* ── Brand ── */}
            <motion.div variants={reduce ? {} : itemVariants} className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3">
                <ShieldCheck size={24} className="text-amber-400" />
              </div>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm text-white/40">
                Sign in to your JH Interior account
              </p>
            </motion.div>

            {/* ── Error message ── */}
            <AnimatePresence mode="popLayout">
              {error && (
                <motion.div
                  key="error"
                  variants={reduce ? {} : errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
                >
                  <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-400" />
                  <p className="text-xs leading-relaxed text-red-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <motion.div variants={reduce ? {} : itemVariants}>
                <FloatingInput
                  id="email"
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </motion.div>

              <motion.div variants={reduce ? {} : itemVariants}>
                <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
              </motion.div>

              {/* ── Forgot password ── */}
              <motion.div
                variants={reduce ? {} : itemVariants}
                className="flex justify-end"
              >
                <button
                  type="button"
                  className="text-xs text-white/35 underline-offset-2 transition-colors duration-150 hover:text-amber-400/80 hover:underline"
                >
                  Forgot password?
                </button>
              </motion.div>

              {/* ── Submit ── */}
              <motion.div variants={reduce ? {} : itemVariants} className="pt-1">
                <motion.button
                  type="submit"
                  disabled={submitting || !email || !password}
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  whileTap={reduce  ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full overflow-hidden rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-400/20 transition-all duration-200 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {submitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Spinner />
                        Signing in…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <LogIn size={15} />
                        Sign in
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {/* shine sweep on hover */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    whileHover={{ translateX: '100%' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.button>
              </motion.div>
            </form>

            {/* ── Divider + roles info ── */}
            <motion.div variants={reduce ? {} : itemVariants} className="mt-6">
              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-white/8" />
                <span className="text-[11px] text-white/25">role-based access</span>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                {Object.entries(ROLE_CONFIG).map(([key, { label, color }]) => (
                  <span
                    key={key}
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${color}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom ambient light ── */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 bg-amber-400/5 blur-3xl" />
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
