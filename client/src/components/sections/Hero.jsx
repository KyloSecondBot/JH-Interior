import { motion } from 'framer-motion';
import AnimatedGradientText from '../reactbits/AnimatedGradientText.jsx';
import GlareHover from '../reactbits/GlareHover.jsx';

const highlights = [
  {
    title: 'Residences',
    desc: 'Quietly luxurious penthouses with sculpted lighting and tactile palettes.',
    badge: 'New York, Dubai',
  },
  {
    title: 'Boutique Hospitality',
    desc: 'Lobby stories, signature suites, and experiential amenities that move.',
    badge: '6 active builds',
  },
  {
    title: 'Worklife',
    desc: 'Rhythmic workspaces with cinematic focus rooms and gallery-grade art curation.',
    badge: 'Scale-ready',
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-16 pt-28 sm:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/80"
          >
            Signature Spaces · Subscription Studio
          </motion.div>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Cinematic interiors, delivered like modern software.
          </motion.h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg text-slate-200/85"
          >
            JHInterior orchestrates multi-residential, hospitality, and worklife environments through an always-on design
            and fabrication stack. Strategy, visualization, procurement, and styling move together with motion-first detail.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_16px_60px_rgba(16,185,129,0.4)] transition hover:-translate-y-[2px]"
            >
              Schedule a walkthrough
            </a>
            <a className="text-base font-semibold text-emerald-200 hover:text-white" href="#portfolio">
              View live portfolio →
            </a>
          </div>
          <AnimatedGradientText as="p" className="mt-6 text-sm font-semibold uppercase tracking-[0.35em]">
            Ultra-premium spatial SaaS
          </AnimatedGradientText>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {highlights.map((item, idx) => (
            <GlareHover key={item.title} className="h-full">
              <div className="relative h-full space-y-2 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-white/0 px-5 py-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {item.badge}
                  </span>
                  <motion.div
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-300/80 via-cyan-200/80 to-amber-200/90"
                    animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.04, 0.98, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-200/80">{item.desc}</p>
              </div>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  );
}
