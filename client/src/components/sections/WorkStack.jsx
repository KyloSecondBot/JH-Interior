import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack.jsx';
import AnimatedGradientText from '../reactbits/AnimatedGradientText.jsx';
import { useWorkStack } from '../../hooks/useWorkStack.js';

const FALLBACK = [
  {
    id: 'f1', index: '01', title: 'Halo Suites', location: 'Seoul', type: 'Boutique Hospitality',
    description: 'Signature suites with luminous arches, gallery-grade art rotations, and choreographed lighting scenes that shift from arrival to late-night.',
    metric: '+38% ADR', metric_label: 'average daily rate lift',
    palette_from: '#0d0d0d', palette_via: '#111111', palette_to: '#000000', accent_color: 'text-amber-300',
  },
  {
    id: 'f2', index: '02', title: 'Sands Members Club', location: 'Dubai', type: 'Private Lounge',
    description: 'Molten brass detailing, kinetic textiles, and ambient sound systems that adapt to guest density and time of day.',
    metric: '+54%', metric_label: 'membership growth in year one',
    palette_from: '#0f0f0f', palette_via: '#131313', palette_to: '#090909', accent_color: 'text-amber-200',
  },
  {
    id: 'f3', index: '03', title: 'Cove Duplex', location: 'TriBeCa, New York', type: 'Residential',
    description: 'Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft. Completed nine weeks from brief to handover.',
    metric: '9 wks', metric_label: 'brief to white-glove handover',
    palette_from: '#0c0c0c', palette_via: '#101010', palette_to: '#000000', accent_color: 'text-amber-300',
  },
  {
    id: 'f4', index: '04', title: 'Drift Spa', location: 'Bali', type: 'Wellness & Hospitality',
    description: 'Vapor glass partitions, ripple-light ceilings, and material palettes sourced entirely from the surrounding volcanic landscape.',
    metric: '100%', metric_label: 'occupancy at soft launch',
    palette_from: '#0e0e0e', palette_via: '#121212', palette_to: '#090909', accent_color: 'text-amber-200',
  },
];

export default function WorkStack() {
  const { projects: liveProjects, loading } = useWorkStack();
  const projects = !loading && liveProjects.length > 0 ? liveProjects : FALLBACK;

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
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Signature Work</p>
        <div className="mt-2 flex items-end justify-between">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Projects that{' '}
            <AnimatedGradientText as="span">set the standard.</AnimatedGradientText>
          </h2>
          <p className="hidden text-sm text-white/35 sm:block">Scroll to explore</p>
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
        {projects.map((p) => {
          const palette = `from-[${p.palette_from}] via-[${p.palette_via}] to-[${p.palette_to}]`;
          const accent  = p.accent_color ?? 'text-amber-300';
          const tagCls  = accent.includes('200')
            ? 'bg-amber-400/10 text-amber-200 border-amber-400/20'
            : 'bg-amber-400/10 text-amber-300 border-amber-400/25';
          const barCls  = accent.includes('200')
            ? 'bg-gradient-to-r from-amber-300 to-yellow-200'
            : 'bg-gradient-to-r from-amber-400 to-amber-300';

          return (
            <ScrollStackItem
              key={p.id}
              itemClassName={`bg-gradient-to-br ${palette} border border-white/8 !h-auto !p-0 !my-0 !rounded-3xl overflow-hidden`}
            >
              {/* Card inner layout */}
              <div className="flex flex-col gap-6 p-8 sm:p-10 md:p-12">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <span className={`font-display text-6xl font-semibold opacity-20 leading-none ${accent}`}>
                    {p.index}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${tagCls}`}>
                    {p.type}
                  </span>
                </div>

                {/* Title + location */}
                <div>
                  <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl leading-tight">
                    {p.title}
                  </h3>
                  <p className={`mt-1 text-sm font-medium ${accent} opacity-70`}>{p.location}</p>
                </div>

                {/* Description */}
                <p className="max-w-xl text-base text-white/65 leading-relaxed">
                  {p.description}
                </p>

                {/* Metric bar */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${accent}`}>{p.metric}</span>
                    <span className="text-xs text-white/35 uppercase tracking-wide">{p.metric_label}</span>
                  </div>
                  <div className="h-[2px] w-full rounded-full bg-white/5">
                    <div className={`h-full w-2/3 rounded-full ${barCls}`} />
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
