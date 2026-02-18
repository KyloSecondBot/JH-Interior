import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    en: 'Price Estimation',
    id: 'Estimasi Harga',
    desc: 'We assess your space, requirements, and vision to provide a detailed, transparent cost estimate — no hidden fees.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    color: 'from-amber-400/20 to-amber-400/0',
    accent: 'text-amber-300',
    border: 'border-amber-400/20',
    glow: 'rgba(251,191,36,0.15)',
  },
  {
    num: '02',
    en: 'Site Survey',
    id: 'Survey Lokasi',
    desc: 'Our team visits your location to measure, document, and deeply understand the space before any design begins.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    color: 'from-cyan-400/20 to-cyan-400/0',
    accent: 'text-cyan-300',
    border: 'border-cyan-400/20',
    glow: 'rgba(34,211,238,0.15)',
  },
  {
    num: '03',
    en: 'Design',
    id: 'Desain',
    desc: 'We craft detailed interior plans, 3D visualizations, and curated material selections — refined until you love it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    color: 'from-emerald-400/20 to-emerald-400/0',
    accent: 'text-emerald-300',
    border: 'border-emerald-400/20',
    glow: 'rgba(52,211,153,0.15)',
  },
  {
    num: '04',
    en: 'Production',
    id: 'Proses Produksi',
    desc: 'Custom furniture and fittings are built to spec in our facility with full quality-control checks at every milestone.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.scissors-.973a2.975 2.975 0 0 0-.35-.35M14.126 11.37a4 4 0 0 1-2.742 5.56m1.15-8.303a4 4 0 0 0-5.56 2.742" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    color: 'from-violet-400/20 to-violet-400/0',
    accent: 'text-violet-300',
    border: 'border-violet-400/20',
    glow: 'rgba(167,139,250,0.15)',
  },
  {
    num: '05',
    en: 'Installation',
    id: 'Instalasi',
    desc: 'White-glove on-site installation, final styling, and handover. We leave when every detail is exactly right.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    color: 'from-rose-400/20 to-rose-400/0',
    accent: 'text-rose-300',
    border: 'border-rose-400/20',
    glow: 'rgba(251,113,133,0.15)',
  },
];

export default function Process() {
  return (
    <section id="process" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Proses Kerja</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              How we bring your space to life.
            </h2>
            <p className="text-sm text-slate-400/70">Five clear steps.</p>
          </div>
        </motion.div>

        {/* Step grid */}
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {/* Connector line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px lg:block">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400/30 via-emerald-400/30 to-rose-400/30"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              /* Motion MCP spring: 500ms linear(0, 0.4133, 1.0078, ...) ≈ bounce 0.15 */
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.09 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-gradient-to-b ${step.color} ${step.border} p-5 backdrop-blur-sm`}
              style={{ boxShadow: `0 0 0 0 ${step.glow}`, transition: 'box-shadow 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 40px ${step.glow}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 0 ${step.glow}`}
            >
              {/* Large faded step number */}
              <span className="pointer-events-none absolute -right-2 -top-3 font-display text-7xl font-bold leading-none text-white/5 select-none">
                {step.num}
              </span>

              {/* Icon circle */}
              <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border bg-white/5 ${step.border} ${step.accent}`}>
                {step.icon}
              </div>

              {/* Step number pill */}
              <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${step.border} ${step.accent} bg-white/5`}>
                {step.num}
              </span>

              {/* Text */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-base font-semibold text-white">{step.en}</h3>
                <p className={`text-xs font-medium ${step.accent} opacity-70`}>{step.id}</p>
              </div>

              <p className="relative z-10 text-xs leading-relaxed text-slate-300/75">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
