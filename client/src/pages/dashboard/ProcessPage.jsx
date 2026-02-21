import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useProcess } from '../../hooks/useProcess';
import { useUnsavedGuard } from '../../hooks/useUnsavedGuard';
import UnsavedModal from '../../components/dashboard/UnsavedModal';
import DataTable from '../../components/dashboard/DataTable';

const ICON_OPTIONS = ['money', 'location', 'design', 'wrench', 'home'];

const EMPTY = { num: '01', title_en: '', title_id: '', description: '', icon_name: 'home', sort_order: 0 };
const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </label>
  );
}

export default function ProcessPage() {
  const { steps, loading, addStep, updateStep, deleteStep } = useProcess();
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState(null);
  useUnsavedGuard(drawerOpen);
  const [showDiscard, setShowDiscard] = useState(false);
  const initialFormRef = useRef(null);

  function s(key) { return (e) => setForm((f) => ({ ...f, [key]: e.target.value })); }

  function isDirty() { return JSON.stringify(form) !== JSON.stringify(initialFormRef.current); }
  function closeDrawer() { setDrawerOpen(false); setShowDiscard(false); }
  function tryClose() { if (isDirty()) setShowDiscard(true); else closeDrawer(); }

  function openAdd() { setForm(EMPTY); initialFormRef.current = EMPTY; setEditing(null); setDrawerOpen(true); setError(null); }
  function openEdit(row) {
    const f = { num: row.num, title_en: row.title_en, title_id: row.title_id, description: row.description, icon_name: row.icon_name, sort_order: row.sort_order };
    setForm(f); initialFormRef.current = f;
    setEditing(row.id); setDrawerOpen(true); setError(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      if (editing) await updateStep(editing, form);
      else await addStep(form);
      closeDrawer();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  const columns = [
    { key: 'num',       label: '#' },
    { key: 'title_en',  label: 'Step (EN)' },
    { key: 'title_id',  label: 'Step (ID)', mobileHide: true },
    { key: 'icon_name', label: 'Icon',      mobileHide: true },
    { key: 'sort_order',label: 'Order',     mobileHide: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Process Steps</h2>
          <p className="mt-0.5 text-sm text-white/40">The five-step working process shown on the homepage.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300">
          <Plus className="h-4 w-4" /> Add Step
        </button>
      </motion.div>

      {loading ? <p className="text-sm text-white/30">Loading…</p> : (
        <DataTable columns={columns} rows={steps} onEdit={openEdit} onDelete={deleteStep} emptyText="No process steps yet." />
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
              <h3 className="font-semibold text-white">{editing ? 'Edit Step' : 'Add Step'}</h3>
              <button onClick={tryClose} className="text-white/40 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSave} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Step Number (e.g. 01)">
                  <input className={inputCls} value={form.num} onChange={s('num')} placeholder="01" />
                </Field>
                <Field label="Sort Order">
                  <input type="number" className={inputCls} value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: +e.target.value }))} />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title (English)">
                  <input className={inputCls} value={form.title_en} required onChange={s('title_en')} placeholder="Price Estimation" />
                </Field>
                <Field label="Title (Indonesian)">
                  <input className={inputCls} value={form.title_id} onChange={s('title_id')} placeholder="Estimasi Harga" />
                </Field>
              </div>
              <Field label="Description">
                <textarea className={`${inputCls} min-h-[96px] resize-y`} value={form.description} onChange={s('description')} />
              </Field>
              <Field label="Icon">
                <select
                  className={`${inputCls} cursor-pointer`}
                  value={form.icon_name}
                  onChange={s('icon_name')}
                >
                  {ICON_OPTIONS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <p className="text-[11px] text-white/25 mt-1">
                  money · location · design · wrench · home
                </p>
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
