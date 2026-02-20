import { motion, useReducedMotion } from 'framer-motion';

// Mosaic images — above the fold (LCP)
import img11 from '../../assets/1.1.webp';
import img21 from '../../assets/2.1.webp';
import img13 from '../../assets/1.3.webp';

// Marquee strip — lazy loaded
import img12 from '../../assets/1.2.webp';
import img14 from '../../assets/1.4.webp';
import img15 from '../../assets/1.5.webp';
import img22 from '../../assets/2.2.webp';
import img23 from '../../assets/2.3.webp';
import img24 from '../../assets/2.4.webp';
import img26 from '../../assets/2.6.webp';
import img27 from '../../assets/2.7.webp';
import img28 from '../../assets/2.8.webp';

const MARQUEE_IMAGES = [img12, img22, img14, img23, img15, img24, img26, img27, img28];

const HEADLINE_LINES = [
  { text: 'Spaces That', accent: false },
  { text: 'Define How', accent: true },
  { text: 'You Live.', accent: false },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-0 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">

      {/* ─── Two-column grid ─── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">

        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col gap-6">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-amber-400/20 bg-amber-400/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            Interior Design Studio · Est. 1999  
          </motion.div>

          {/* Headline — clip reveal per line */}
          <h1 className="flex flex-col gap-0 text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[82px]">
            {HEADLINE_LINES.map(({ text, accent }, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: i * 0.11 }}
                >
                  {accent ? (
                    <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">
                      {text}
                    </span>
                  ) : (
                    text
                  )}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
            className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            JH Interior crafts cinematic residences, boutique hospitality spaces, and
            next-generation workplaces — from vision through final styling, delivered as an
            always-on design subscription.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_50px_rgba(251,191,36,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_80px_rgba(251,191,36,0.65)]"
            >
              Book a Consultation
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              View our work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Micro-stats */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
            className="mt-2 grid grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {[
              { v: '80+', l: 'Projects delivered' },
              { v: '6', l: 'Active builds' },
              { v: '100%', l: 'Client satisfaction' },
            ].map(({ v, l }) => (
              <div key={l} className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-semibold text-white sm:text-3xl">{v}</span>
                <span className="text-xs text-white/38">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Image mosaic ── */}
        <div className="relative grid h-[480px] grid-cols-2 grid-rows-2 gap-3 sm:h-[560px] lg:h-[640px]">

          {/* Card 1 — tall, spans both rows */}
          <motion.div
            className="relative row-span-2 overflow-hidden rounded-3xl"
            initial={reduce ? false : { opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <motion.img
              src={img11}
              alt="Luxury residence designed by JH Interior"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              animate={reduce ? {} : { scale: [1, 1.04, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-slate-950/10 to-transparent" />
            {/* Floating info pill */}
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              animate={reduce ? {} : { y: [0, -4, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="rounded-2xl border border-white/15 bg-black/65 px-3.5 py-2.5 backdrop-blur-md">
                <p className="text-xs font-semibold text-amber-300/80">Luxury Residence</p>
                <p className="mt-0.5 text-[11px] text-white/55">Jakarta · Completed 2025</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2 — top right */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={reduce ? false : { opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
          >
            <img
              src={img21}
              alt="JH Interior boutique hospitality space"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-slate-950/45" />
          </motion.div>

          {/* Card 3 — bottom right */}
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={reduce ? false : { opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <img
              src={img13}
              alt="JH Interior workspace design"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            {/* Floating project count badge */}
            <motion.div
              className="absolute right-3 top-3 rounded-2xl border border-white/15 bg-black/70 px-3 py-2 text-center backdrop-blur-md"
              animate={reduce ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            >
              <span className="font-display block text-xl font-bold text-white leading-none">12+</span>
              <span className="text-[10px] text-white/38">Projects</span>
            </motion.div>
          </motion.div>

          {/* Ambient glow orbs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-400/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-8 h-52 w-52 rounded-full bg-amber-300/6 blur-3xl" />
        </div>
      </div>

      {/* ─── Photo marquee strip ─── */}
      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black to-transparent" />
        <div className="marquee-track flex w-max gap-4">
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
            <div
              key={i}
              className="h-28 w-44 flex-none overflow-hidden rounded-2xl sm:h-32 sm:w-52"
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-55 transition-opacity duration-300 hover:opacity-85"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <div className="mt-10 flex justify-center pb-10">
        <motion.div
          className="flex flex-col items-center gap-2 text-white/30"
          animate={reduce ? {} : { opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-amber-400/70 to-transparent"
              animate={reduce ? {} : { y: ['-100%', '100%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
