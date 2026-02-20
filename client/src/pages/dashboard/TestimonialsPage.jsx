import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useTestimonials } from '../../hooks/useTestimonials';
import DataTable from '../../components/dashboard/DataTable';

const EMPTY = { name: '', title: '', quote: '', sort_order: 0 };

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </label>
  );
}

const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

export default function TestimonialsPage() {
  const { testimonials, loading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [form, setForm]     = useState(EMPTY);
  const [editing, setEditing] = useState(null); // id being edited
  const [saving, setSaving]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError]   = useState(null);

  function openAdd() {
    setForm(EMPTY);
    setEditing(null);
    setDrawerOpen(true);
    setError(null);
  }

  function openEdit(row) {
    setForm({ name: row.name, title: row.title, quote: row.quote, sort_order: row.sort_order });
    setEditing(row.id);
    setDrawerOpen(true);
    setError(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        await updateTestimonial(editing, form);
      } else {
        await addTestimonial(form);
      }
      setDrawerOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const columns = [
    { key: 'name',  label: 'Name' },
    { key: 'title', label: 'Title' },
    { key: 'quote', label: 'Quote', render: (v) => <span className="line-clamp-2 max-w-xs">{v}</span> },
    { key: 'sort_order', label: 'Order' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-white">Testimonials</h2>
          <p className="mt-0.5 text-sm text-white/40">Client quotes shown on the homepage.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </motion.div>

      {loading ? (
        <p className="text-sm text-white/30">Loading…</p>
      ) : (
        <DataTable
          columns={columns}
          rows={testimonials}
          onEdit={openEdit}
          onDelete={deleteTestimonial}
          emptyText="No testimonials yet. Add your first one."
        />
      )}

      {/* Slide-over form */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="relative ml-auto flex h-full w-full max-w-md flex-col border-l border-white/8 bg-[#0e0e0e] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <h3 className="font-semibold text-white">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setDrawerOpen(false)} className="text-white/40 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
              <Field label="Name">
                <input className={inputCls} value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Amira Wolfe" />
              </Field>
              <Field label="Title / Company">
                <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="GM, Halo Suites" />
              </Field>
              <Field label="Quote">
                <textarea className={`${inputCls} min-h-[120px] resize-y`} value={form.quote} required onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="They choreographed every guest touchpoint…" />
              </Field>
              <Field label="Sort Order">
                <input type="number" className={inputCls} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: +e.target.value })} />
              </Field>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="mt-auto flex gap-3">
                <button type="button" onClick={() => setDrawerOpen(false)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </motion.aside>
        </div>
      )}
    </div>
  );
}
