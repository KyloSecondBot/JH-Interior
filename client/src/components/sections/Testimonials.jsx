import { motion } from 'framer-motion';
import GlareHover from '../reactbits/GlareHover.jsx';
import { useTestimonials } from '../../hooks/useTestimonials.js';

const FALLBACK = [
  {
    id: 'fallback-1',
    name: 'Amira Wolfe',
    title: 'GM, Halo Suites',
    quote: 'They choreographed every guest touchpoint with light and motion. We opened at 94% occupancy and held premium ADR from week one.',
  },
  {
    id: 'fallback-2',
    name: 'Derrick Lau',
    title: 'Founder, Sands Members Club',
    quote: 'JHInterior made our lounge feel alive. The materials, the scent, the art rotations—they manage it like software.',
  },
];

export default function Testimonials() {
  const { testimonials, loading } = useTestimonials();
  const quotes = !loading && testimonials.length > 0 ? testimonials : FALLBACK;

  return (
    <section className="px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Voices</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Partners who move fast with us.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {quotes.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <GlareHover>
                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-lg text-white/90">“{item.quote}”</p>
                  <div className="text-sm text-white/75">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p>{item.title}</p>
                  </div>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
