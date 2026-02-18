import { motion } from 'framer-motion';

/* ── Contact details (from jhinterior.id) ── */
const ADDRESS   = 'Jl. Syekh Mubarok No. 1A, Kelapa Dua, Pete, Tigaraksa Kecamatan, Tangerang, Banten 15720';
const EMAIL     = 'contact@jhinterior.id';
const PHONE_DISPLAY = '0852-1558-1607';
const WA_LINK   = 'https://wa.me/6285215581607?text=Hello%20JH%20Interior%2C%20I%27m%20interested%20in%20your%20interior%20design%20services.';
const MAPS_EMBED = 'https://maps.google.com/maps?q=Jl.+Syekh+Mubarok+No.+1A,+Kelapa+Dua,+Pete,+Tigaraksa,+Tangerang,+Banten+15720,+Indonesia&output=embed&hl=en&z=16';
const MAPS_LINK  = 'https://maps.google.com/?q=Jl.+Syekh+Mubarok+No.+1A,+Kelapa+Dua,+Pete,+Tigaraksa,+Tangerang,+Banten+15720,+Indonesia';

/* ── Icon helpers ── */
function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5 shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Contact() {
  return (
    <section id="contact" className="px-6 pb-4">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)}>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Contact Us</p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Let's start a conversation.
            </h2>
            <p className="text-sm text-slate-400/70">We respond within 24 hours.</p>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid gap-5 lg:grid-cols-[1fr,1.4fr]">

          {/* ── LEFT: Info card ── */}
          <motion.div
            {...fadeUp(0.08)}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/0 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-7">
              {/* Address */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 text-slate-300/80 transition hover:text-white"
              >
                <span className="mt-0.5 text-emerald-400">
                  <IconLocation />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Office Address</p>
                  <p className="text-sm leading-relaxed">{ADDRESS}</p>
                  <p className="mt-1.5 text-[11px] font-semibold text-emerald-400/70 transition group-hover:text-emerald-400">
                    Open in Google Maps →
                  </p>
                </div>
              </a>

              <div className="h-px bg-white/8" />

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 text-slate-300/80 transition hover:text-white"
              >
                <span className="text-emerald-400">
                  <IconMail />
                </span>
                <div>
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Email</p>
                  <p className="text-sm font-medium">{EMAIL}</p>
                </div>
              </a>

              <div className="h-px bg-white/8" />

              {/* Phone */}
              <a
                href={`tel:+62${PHONE_DISPLAY.replace(/-/g, '').slice(1)}`}
                className="group flex items-center gap-4 text-slate-300/80 transition hover:text-white"
              >
                <span className="text-emerald-400">
                  <IconPhone />
                </span>
                <div>
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Phone</p>
                  <p className="text-sm font-medium">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="h-px bg-white/8" />

              {/* WhatsApp CTA — Motion MCP spring: 450ms linear(0, 0.2459, ...) */}
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="contact-wa-btn flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-[0_8px_32px_rgba(37,211,102,0.35)]"
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 320, damping: 18 } }}
                whileTap={{ scale: 0.97 }}
              >
                <IconWhatsApp />
                Chat on WhatsApp
              </motion.a>

              <p className="text-center text-[11px] text-slate-500">
                Mon – Sat · 08.00 – 17.00 WIB
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Google Maps embed ── */}
          <motion.div
            {...fadeUp(0.16)}
            className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            style={{ minHeight: '420px' }}
          >
            {/* Overlay label */}
            <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl border border-white/15 bg-slate-950/75 px-3.5 py-2 backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">Studio Location</p>
              <p className="mt-0.5 text-xs text-slate-300/70">Tigaraksa, Tangerang</p>
            </div>

            {/* "Open in Maps" shortcut */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/75 px-3.5 py-2 text-[11px] font-semibold text-white/80 backdrop-blur-md transition hover:text-white"
            >
              <IconLocation />
              View larger map
            </a>

            <iframe
              title="JH Interior Location"
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px', display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
