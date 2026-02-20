import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useStats } from '../../hooks/useStats';
import DataTable from '../../components/dashboard/DataTable';

const EMPTY = { label: '', value: 0, suffix: '', sort_order: 0 };

const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </label>
  );
}

export default function StatsPage() {
  const { stats, loading, addStat, updateStat, deleteStat } = useStats();
  const [form, setForm]       = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError]     = useState(null);

  function openAdd() {
    setForm(EMPTY);
    setEditing(null);
    setDrawerOpen(true);
    setError(null);
  }

  function openEdit(row) {
    setForm({ label: row.label, value: row.value, suffix: row.suffix ?? '', sort_order: row.sort_order });
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
        await updateStat(editing, form);
      } else {
        await addStat(form);
      }
      setDrawerOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const columns = [
    { key: 'label',      label: 'Label' },
    { key: 'value',      label: 'Value' },
    { key: 'suffix',     label: 'Suffix', render: (v) => v || <span className="text-white/25">—</span> },
    { key: 'sort_order', label: 'Order' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Stats</h2>
          <p className="mt-0.5 text-sm text-white/40">Numbers shown in the Operational Studio section.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300">
          <Plus className="h-4 w-4" />
          Add Stat
        </button>
      </motion.div>

      {loading ? (
        <p className="text-sm text-white/30">Loading…</p>
      ) : (
        <DataTable columns={columns} rows={stats} onEdit={openEdit} onDelete={deleteStat} emptyText="No stats yet." />
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="relative ml-auto flex h-full w-full max-w-md flex-col border-l border-white/8 bg-[#0e0e0e] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <h3 className="font-semibold text-white">{editing ? 'Edit Stat' : 'Add Stat'}</h3>
              <button onClick={() => setDrawerOpen(false)} className="text-white/40 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSave} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
              <Field label="Label">
                <input className={inputCls} value={form.label} required onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Flagship interiors delivered" />
              </Field>
              <Field label="Value (number)">
                <input type="number" className={inputCls} value={form.value} required onChange={(e) => setForm({ ...form, value: +e.target.value })} />
              </Field>
              <Field label="Suffix (optional)">
                <input className={inputCls} value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} placeholder="% or ' wks'" />
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
