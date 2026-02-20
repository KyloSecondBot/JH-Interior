import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContact } from '../../hooks/useContact';

const inputCls = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-white/25">{hint}</span>}
    </label>
  );
}

export default function ContactPage() {
  const { contact, loading, updateContact } = useContact();
  const [form, setForm]   = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (contact) setForm({ ...contact });
  }, [contact]);

  function set(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await updateContact(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return <p className="text-sm text-white/30">Loading…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">Contact Info</h2>
        <p className="mt-0.5 text-sm text-white/40">Displayed in the Contact section of the homepage.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        onSubmit={handleSave}
        className="space-y-5 rounded-2xl border border-white/8 bg-white/3 p-6"
      >
        <Field label="Office Address">
          <textarea className={`${inputCls} min-h-[72px] resize-y`} value={form.address} onChange={set('address')} placeholder="Jl. Syekh Mubarok No. 1A…" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email">
            <input type="email" className={inputCls} value={form.email} onChange={set('email')} placeholder="contact@jhinterior.id" />
          </Field>
          <Field label="Phone (display)">
            <input className={inputCls} value={form.phone} onChange={set('phone')} placeholder="0852-1558-1607" />
          </Field>
        </div>

        <Field label="WhatsApp Link" hint="Full wa.me/… URL with pre-filled message">
          <input className={inputCls} value={form.whatsapp_link} onChange={set('whatsapp_link')} placeholder="https://wa.me/62…" />
        </Field>

        <Field label="Google Maps Embed URL" hint="Use the embed URL from Google Maps → Share → Embed">
          <input className={inputCls} value={form.maps_embed_url} onChange={set('maps_embed_url')} placeholder="https://maps.google.com/maps?q=…&output=embed" />
        </Field>

        <Field label="Google Maps Link" hint="Direct link opened when clicking the address or map">
          <input className={inputCls} value={form.maps_link} onChange={set('maps_link')} placeholder="https://maps.google.com/?q=…" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business Hours">
            <input className={inputCls} value={form.business_hours} onChange={set('business_hours')} placeholder="Mon – Sat · 08.00 – 17.00 WIB" />
          </Field>
          <Field label="Location Label (map overlay)">
            <input className={inputCls} value={form.location_label} onChange={set('location_label')} placeholder="Tigaraksa, Tangerang" />
          </Field>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && <span className="text-sm text-green-400">Saved!</span>}
        </div>
      </motion.form>
    </div>
  );
}
