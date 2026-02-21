import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import { useUnsavedGuard } from '../../hooks/useUnsavedGuard';
import DataTable from '../../components/dashboard/DataTable';
import UnsavedModal from '../../components/dashboard/UnsavedModal';

const EMPTY = { title: '', bullet_1: '', bullet_2: '', bullet_3: '', sort_order: 0 };
const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </label>
  );
}

export default function ServicesPage() {
  const { services, loading, addService, updateService, deleteService } = useServices();
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState(null);
  const [showDiscard, setShowDiscard] = useState(false);
  const initialFormRef = useRef(null);
  useUnsavedGuard(drawerOpen);

  function s(key) { return (e) => setForm((f) => ({ ...f, [key]: e.target.value })); }

  function isDirty() { return JSON.stringify(form) !== JSON.stringify(initialFormRef.current); }
  function closeDrawer() { setDrawerOpen(false); setShowDiscard(false); }
  function tryClose() { if (isDirty()) setShowDiscard(true); else closeDrawer(); }

  function openAdd() { setForm(EMPTY); initialFormRef.current = EMPTY; setEditing(null); setDrawerOpen(true); setError(null); }
  function openEdit(row) {
    const f = { title: row.title, bullet_1: row.bullet_1, bullet_2: row.bullet_2, bullet_3: row.bullet_3, sort_order: row.sort_order };
    setForm(f); initialFormRef.current = f; setEditing(row.id); setDrawerOpen(true); setError(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      if (editing) await updateService(editing, form);
      else await addService(form);
      closeDrawer();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  const columns = [
    { key: 'title',      label: 'Title' },
    { key: 'bullet_1',   label: 'Bullet 1', mobileHide: true },
    { key: 'bullet_2',   label: 'Bullet 2', mobileHide: true },
    { key: 'sort_order', label: 'Order',    mobileHide: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Services</h2>
          <p className="mt-0.5 text-sm text-white/40">The three service offerings shown on the homepage.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </motion.div>

      {loading ? <p className="text-sm text-white/30">Loading…</p> : (
        <DataTable columns={columns} rows={services} onEdit={openEdit} onDelete={deleteService} emptyText="No services yet." />
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={tryClose} />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="relative ml-auto flex h-full w-full max-w-lg flex-col border-l border-white/8 bg-[#0e0e0e] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <h3 className="font-semibold text-white">{editing ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={tryClose} className="text-white/40 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
              <Field label="Title">
                <input className={inputCls} value={form.title} required onChange={s('title')} placeholder="Vision to Motion" />
              </Field>
              <Field label="Bullet 1">
                <input className={inputCls} value={form.bullet_1} onChange={s('bullet_1')} placeholder="Narrative + palette strategy" />
              </Field>
              <Field label="Bullet 2">
                <input className={inputCls} value={form.bullet_2} onChange={s('bullet_2')} placeholder="Animation + spatial UI proofs" />
              </Field>
              <Field label="Bullet 3">
                <input className={inputCls} value={form.bullet_3} onChange={s('bullet_3')} placeholder="Finish + furnishing playbooks" />
              </Field>
              <Field label="Sort Order">
                <input type="number" className={inputCls} value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: +e.target.value }))} />
              </Field>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="mt-auto flex gap-3">
                <button type="button" onClick={tryClose} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </motion.aside>
        </div>
      )}
      {showDiscard && (
        <UnsavedModal
          title="Discard changes?"
          message="Your unsaved edits will be lost."
          leaveLabel="Discard"
          stayLabel="Keep editing"
          onLeave={closeDrawer}
          onStay={() => setShowDiscard(false)}
        />
      )}
    </div>
  );
}
