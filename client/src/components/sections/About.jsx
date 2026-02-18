import { motion } from 'framer-motion';

// Press / media logos
import logoBloomberg  from '../../assets/Bloomberg Logo.webp';
import logoForbes     from '../../assets/Forbes Logo.webp';
import logoVogue      from '../../assets/Vogue-Logo.webp';
import logoCNBC       from '../../assets/cnbc indonesia Logo.webp';
import logoTempo      from '../../assets/Tempo Logo.webp';
import logoCNN        from '../../assets/CNN_Indonesia Logo.webp';
import logoTribun     from '../../assets/tribunnews Logo.webp';

const PRESS = [
  { src: logoBloomberg, alt: 'Bloomberg',      forceWhite: true  },
  { src: logoForbes,    alt: 'Forbes',         forceWhite: true  },
  { src: logoVogue,     alt: 'Vogue',          forceWhite: true  },
  { src: logoCNBC,      alt: 'CNBC Indonesia', forceWhite: false },
  { src: logoTempo,     alt: 'Tempo',          forceWhite: false },
  { src: logoCNN,       alt: 'CNN Indonesia',  forceWhite: false },
  { src: logoTribun,    alt: 'Tribun News',    forceWhite: false },
];

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    label: '200+',
    desc: 'Design professionals',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: 'Nationwide',
    desc: 'Services across Indonesia',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    label: '#1',
    desc: 'Design & build in Indonesia',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: 'End-to-end',
    desc: 'Vision to white-glove handover',
  },
];

export default function About() {
  return (
    <section id="about" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">About JH Interior</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-xl text-3xl font-semibold text-white sm:text-4xl">
              Indonesia's leading design &amp; build interior company.
            </h2>
            <p className="text-sm text-slate-400/70 sm:text-right sm:max-w-xs">Est. 1999 · Jakarta, Indonesia</p>
          </div>
        </motion.div>

        {/* ── Main card ── */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/0 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          {/* Background radial glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 15% 40%, rgba(255,255,255,0.07), transparent 40%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.04), transparent 38%)',
            }}
          />

          <div className="relative grid gap-0 lg:grid-cols-2">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center gap-5 px-8 py-10 sm:px-10 lg:py-12"
            >
              <p className="text-base leading-relaxed text-slate-200/85 sm:text-lg">
                With promising quality and results, JH Interior delivers exceptional solutions to meet
                the demand for <span className="font-semibold text-white">luxury home interiors</span>.
              </p>
              <p className="text-base leading-relaxed text-slate-300/70">
                With more than <span className="font-semibold text-white">200 highly skilled personnel</span> and
                nationwide services, we are committed to transforming every space into an experience that endures —
                from concept and material selection through fabrication, installation, and final styling.
              </p>
              <p className="text-base leading-relaxed text-slate-300/70">
                From intimate residences in Jakarta to landmark hospitality spaces across the archipelago,
                our full-stack design pipeline brings each vision to life with the precision of a product studio
                and the soul of a design house.
              </p>
            </motion.div>

            {/* Right: pillars grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="grid grid-cols-2 gap-px border-t border-white/8 lg:border-l lg:border-t-0"
            >
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                  className="group flex flex-col gap-3 border-white/8 bg-white/3 p-6 transition hover:bg-white/6 [&:nth-child(odd)]:border-r [&:nth-child(-n+2)]:border-b"
                >
                  <span className="text-white/50 transition group-hover:text-white">
                    {p.icon}
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold text-white">{p.label}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── "Featured In" — dual counter-scrolling marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-slate-400/70">
            As Featured In
          </p>

          {/* ── Row 1: scrolls left ── */}
          <PressRow logos={PRESS} className="press-track" />

          {/* ── Row 2: scrolls right (reversed order for contrast) ── */}
          <PressRow logos={[...PRESS].reverse()} className="press-track-reverse" />

          <p className="text-center text-xs text-slate-500/60">And many more global publications.</p>
        </motion.div>

      </div>
    </section>
  );
}

/* ── PressRow: one scrolling strip ── */
function PressRow({ logos, className }) {
  return (
    <div className="relative overflow-hidden py-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-slate-950 to-transparent" />
      <div className={`${className} flex w-max items-center gap-4`}>
        {[...logos, ...logos].map((logo, i) => (
          <PressCard key={i} logo={logo} />
        ))}
      </div>
    </div>
  );
}

/* ── PressCard: individual logo pill ── */
function PressCard({ logo }) {
  return (
    <div className="press-pill group flex-none flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-5 backdrop-blur-sm">
      <div className="flex h-10 w-32 items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          className={[
            'max-h-full max-w-full object-contain transition-opacity duration-300',
            logo.forceWhite
              ? 'brightness-0 invert opacity-70 group-hover:opacity-100'
              : 'opacity-85 group-hover:opacity-100',
          ].join(' ')}
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
}
