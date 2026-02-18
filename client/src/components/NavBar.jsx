import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialLinks from './SocialLinks.jsx';
import logo from '../assets/jh-logo.webp';

const links = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Product', href: '#portfolio-product' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed left-0 right-0 top-0 z-40"
      >
        {/* Main pill */}
        <div
          className={`mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/10 px-4 py-3 backdrop-blur-xl transition-all sm:px-6 ${
            scrolled || menuOpen
              ? 'bg-slate-900/90 shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
              : 'bg-slate-900/30'
          }`}
        >
          {/* Logo */}
          <a href="#" aria-label="JH Interior home" className="shrink-0" onClick={closeMenu}>
            <img
              src={logo}
              alt="JH Interior"
              className="h-11 w-11 rounded-xl object-cover shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition hover:scale-105 sm:h-12 sm:w-12"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-100/80 sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-white hover:drop-shadow-[0_0_12px_rgba(94,234,212,0.8)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-2 sm:flex sm:gap-3">
            <SocialLinks />
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 px-4 py-2 text-slate-900 text-sm font-semibold shadow-[0_10px_40px_rgba(16,185,129,0.35)] transition hover:-translate-y-[1px] sm:text-base"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10 sm:hidden"
          >
            <motion.div
              animate={menuOpen ? 'open' : 'closed'}
              className="flex flex-col items-center justify-center gap-[5px]"
            >
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
              />
              <motion.span
                variants={{ closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0 } }}
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
              />
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 px-5 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:hidden"
            >
              <nav className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.04 }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-slate-100/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                    <span className="text-white/20">→</span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
                <a
                  href="#cta"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 py-3 text-slate-900 text-sm font-semibold shadow-[0_6px_24px_rgba(16,185,129,0.3)] transition hover:-translate-y-[1px]"
                >
                  Book a Call
                </a>
                <div className="flex items-center justify-between">
                  <SocialLinks />
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400/60">Follow us</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40 sm:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}
