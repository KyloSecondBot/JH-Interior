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
              href="https://wa.me/6285215581607?text=Hello%20JH%20Interior%2C%20I%27m%20interested%20in%20your%20interior%20design%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_28px_rgba(37,211,102,0.4)] transition hover:-translate-y-[2px]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="mailto:contact@jhinterior.id"
              className="text-center text-sm font-semibold text-emerald-100 hover:text-white transition"
            >
              contact@jhinterior.id →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
