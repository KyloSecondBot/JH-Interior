import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack.jsx';
import AnimatedGradientText from '../reactbits/AnimatedGradientText.jsx';

const projects = [
  {
    index: '01',
    title: 'Halo Suites',
    location: 'Seoul',
    type: 'Boutique Hospitality',
    description:
      'Signature suites with luminous arches, gallery-grade art rotations, and choreographed lighting scenes that shift from arrival to late-night.',
    metric: '+38% ADR',
    metricLabel: 'average daily rate lift',
    palette: 'from-[#0e1020] via-[#1a1440] to-[#0b0e1a]',
    accent: 'text-white/80',
    tag: 'bg-white/10 text-white/75 border-white/20',
    bar: 'bg-gradient-to-r from-white/60 to-slate-300/40',
  },
  {
    index: '02',
    title: 'Sands Members Club',
    location: 'Dubai',
    type: 'Private Lounge',
    description:
      'Molten brass detailing, kinetic textiles, and ambient sound systems that adapt to guest density and time of day.',
    metric: '+54%',
    metricLabel: 'membership growth in year one',
    palette: 'from-[#120d08] via-[#1e1408] to-[#0f0d0a]',
    accent: 'text-white/75',
    tag: 'bg-white/10 text-white/70 border-white/20',
    bar: 'bg-gradient-to-r from-white/50 to-slate-400/35',
  },
  {
    index: '03',
    title: 'Cove Duplex',
    location: 'TriBeCa, New York',
    type: 'Residential',
    description:
      'Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft. Completed nine weeks from brief to handover.',
    metric: '9 wks',
    metricLabel: 'brief to white-glove handover',
    palette: 'from-[#0a1410] via-[#0d1c14] to-[#080f0c]',
    accent: 'text-white/75',
    tag: 'bg-white/10 text-white/70 border-white/20',
    bar: 'bg-gradient-to-r from-white/55 to-slate-300/40',
  },
  {
    index: '04',
    title: 'Drift Spa',
    location: 'Bali',
    type: 'Wellness & Hospitality',
    description:
      'Vapor glass partitions, ripple-light ceilings, and material palettes sourced entirely from the surrounding volcanic landscape.',
    metric: '100%',
    metricLabel: 'occupancy at soft launch',
    palette: 'from-[#08101a] via-[#0e1824] to-[#070e18]',
    accent: 'text-white/75',
    tag: 'bg-white/10 text-white/70 border-white/20',
    bar: 'bg-gradient-to-r from-white/50 to-slate-400/30',
  },
];

export default function WorkStack() {
  return (
    <section className="relative">
      {/* Section header — sits above the sticky scroll area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl px-6 pb-4"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Signature Work</p>
        <div className="mt-2 flex items-end justify-between">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Projects that{' '}
            <AnimatedGradientText as="span">set the standard.</AnimatedGradientText>
          </h2>
          <p className="hidden text-sm text-slate-400/70 sm:block">Scroll to explore</p>
        </div>
      </motion.div>

      {/* ScrollStack — window scroll mode so it flows with the page */}
      <ScrollStack
        useWindowScroll
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={24}
        stackPosition="18%"
        scaleEndPosition="8%"
        baseScale={0.84}
      >
        {projects.map((p) => (
          <ScrollStackItem
            key={p.index}
            itemClassName={`bg-gradient-to-br ${p.palette} border border-white/8 !h-auto !p-0 !my-0 !rounded-3xl overflow-hidden`}
          >
            {/* Card inner layout */}
            <div className="flex flex-col gap-6 p-8 sm:p-10 md:p-12">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <span className={`font-display text-6xl font-semibold opacity-20 leading-none ${p.accent}`}>
                  {p.index}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${p.tag}`}>
                  {p.type}
                </span>
              </div>

              {/* Title + location */}
              <div>
                <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl leading-tight">
                  {p.title}
                </h3>
                <p className={`mt-1 text-sm font-medium ${p.accent} opacity-70`}>{p.location}</p>
              </div>

              {/* Description */}
              <p className="max-w-xl text-base text-slate-300/80 leading-relaxed">
                {p.description}
              </p>

              {/* Metric bar */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${p.accent}`}>{p.metric}</span>
                  <span className="text-xs text-slate-400/70 uppercase tracking-wide">{p.metricLabel}</span>
                </div>
                <div className="h-[2px] w-full rounded-full bg-white/5">
                  <div className={`h-full w-2/3 rounded-full ${p.bar}`} />
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
