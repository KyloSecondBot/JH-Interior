import { motion } from 'framer-motion';
import AnimatedGradientText from '../reactbits/AnimatedGradientText.jsx';

export default function CTA() {
  return (
    <section id="cta" className="px-6 pb-16">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-400/15 via-cyan-400/12 to-white/5 p-8 shadow-[0_20px_70px_rgba(16,185,129,0.3)] sm:p-12"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/80">Engage</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Let’s choreograph your next space.</h2>
            <p className="max-w-2xl text-slate-200/80">
              Tell us about the experience you want guests to feel. We’ll return with an animated proof, budget bands, and
              a delivery calendar in under seven days.
            </p>
            <AnimatedGradientText className="text-sm font-semibold">White-glove · Global · Remote friendly</AnimatedGradientText>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:studio@jhinterior.studio"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:-translate-y-[2px]"
            >
              studio@jhinterior.studio
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-emerald-100 hover:text-white"
            >
              Download credential deck →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
