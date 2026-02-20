import { motion } from 'framer-motion';
import GlareHover from '../reactbits/GlareHover.jsx';
import { useServices } from '../../hooks/useServices.js';

const FALLBACK = [
  {
    id: 'f1', title: 'Vision to Motion',
    bullet_1: 'Narrative + palette strategy',
    bullet_2: 'Animation + spatial UI proofs',
    bullet_3: 'Finish + furnishing playbooks',
  },
  {
    id: 'f2', title: 'Build + Procurement',
    bullet_1: 'Vendor orchestration',
    bullet_2: 'Fabrication-ready docs',
    bullet_3: 'Just-in-time logistics',
  },
  {
    id: 'f3', title: 'Install + Stewardship',
    bullet_1: 'On-site choreography',
    bullet_2: 'Art + styling curation',
    bullet_3: 'Performance tracking + refresh cycles',
  },
];

export default function Services() {
  const { services: liveServices, loading } = useServices();
  const services = !loading && liveServices.length > 0 ? liveServices : FALLBACK;

  return (
    <section id="services" className="px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Offering</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Everything required to deliver emotive spaces.</h2>
          <p className="max-w-3xl text-white/75">
            One team to own the entire pipeline: concept, animation, procurement, and install. Subscribe to a live interior
            program or commission a flagship build.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, idx) => {
            const bullets = [service.bullet_1, service.bullet_2, service.bullet_3].filter(Boolean);
            return (
              <motion.div
                key={service.id}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
              >
                <GlareHover>
                  <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-200 opacity-90" />
                    </div>
                    <ul className="space-y-2 text-sm text-white/80">
                      {bullets.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-amber-400/70" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
