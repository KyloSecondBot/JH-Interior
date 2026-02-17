import { motion } from 'framer-motion';

const phases = [
  {
    title: 'Pulse',
    desc: 'Deep-dive on brand energy, behavior, and material language. We storyboard flows and capture motion palettes.',
  },
  {
    title: 'Proof',
    desc: 'Animated spatial proofs, 3D assets, and interactive lighting scenes. Every surface is prototyped to scale.',
  },
  {
    title: 'Produce',
    desc: 'Procurement, fabrication, and vendor direction with weekly dashboards and QC gates at every milestone.',
  },
  {
    title: 'Place',
    desc: 'On-site choreography, styling, and art curation. Soft openings, scent, and sound are all dialed in.',
  },
];

export default function Process() {
  return (
    <section id="process" className="px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Method</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">A choreography-first build process.</h2>
          <p className="max-w-3xl text-slate-200/80">
            Every phase is designed to maintain tempo: strategy, visualization, procurement, and install move as one,
            with rapid iteration and motion artifacts at every checkpoint.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 hidden w-px bg-gradient-to-b from-emerald-300/70 via-white/10 to-transparent sm:block" />
          <div className="space-y-5">
            {phases.map((phase, idx) => (
              <motion.div
                key={phase.title}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
                className="relative grid gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:grid-cols-[auto,1fr] sm:items-start sm:gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="hidden h-3 w-3 rounded-full bg-emerald-300 sm:block" />
                  <p className="text-sm font-semibold text-emerald-100/80">0{idx + 1}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{phase.title}</h3>
                  <p className="text-sm text-slate-200/85">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
