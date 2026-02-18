import { motion } from 'framer-motion';
import GlareHover from '../reactbits/GlareHover.jsx';

const services = [
  {
    title: 'Vision to Motion',
    bullet: ['Narrative + palette strategy', 'Animation + spatial UI proofs', 'Finish + furnishing playbooks'],
  },
  {
    title: 'Build + Procurement',
    bullet: ['Vendor orchestration', 'Fabrication-ready docs', 'Just-in-time logistics'],
  },
  {
    title: 'Install + Stewardship',
    bullet: ['On-site choreography', 'Art + styling curation', 'Performance tracking + refresh cycles'],
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Offering</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Everything required to deliver emotive spaces.</h2>
          <p className="max-w-3xl text-slate-200/80">
            One team to own the entire pipeline: concept, animation, procurement, and install. Subscribe to a live interior
            program or commission a flagship build.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
            >
              <GlareHover>
                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white via-slate-200 to-white/80 opacity-80" />
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200/85">
                    {service.bullet.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-[6px] h-2 w-2 rounded-full bg-white/50" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
