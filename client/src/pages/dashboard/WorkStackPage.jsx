import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useWorkStack } from '../../hooks/useWorkStack';
import { useUnsavedGuard } from '../../hooks/useUnsavedGuard';
import UnsavedModal from '../../components/dashboard/UnsavedModal';
import DataTable from '../../components/dashboard/DataTable';
import ImageUploader from '../../components/dashboard/ImageUploader';

const EMPTY = {
  index: '01', title: '', location: '', type: '', description: '',
  metric: '', metric_label: '',
  palette_from: '#0d0d0d', palette_via: '#111111', palette_to: '#000000',
  accent_color: 'text-amber-300', image_url: '', sort_order: 0,
};

const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </div>
  );
}

export default function WorkStackPage() {
  const { projects, loading, addProject, updateProject, deleteProject, reorderProjects } = useWorkStack();
  const [form, setForm]       = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError]     = useState(null);
  useUnsavedGuard(drawerOpen);
  const [showDiscard, setShowDiscard] = useState(false);
  const initialFormRef = useRef(null);

  function s(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function isDirty() { return JSON.stringify(form) !== JSON.stringify(initialFormRef.current); }
  function closeDrawer() { setDrawerOpen(false); setShowDiscard(false); }
  function tryClose() { if (isDirty()) setShowDiscard(true); else closeDrawer(); }

  function openAdd() {
    const f = { ...EMPTY, sort_order: projects.length };
    setForm(f);
    initialFormRef.current = f;
    setEditing(null);
    setDrawerOpen(true);
    setError(null);
  }

  function openEdit(row) {
    const f = {
      index: row.index, title: row.title, location: row.location, type: row.type,
      description: row.description, metric: row.metric, metric_label: row.metric_label,
      palette_from: row.palette_from, palette_via: row.palette_via, palette_to: row.palette_to,
      accent_color: row.accent_color, image_url: row.image_url ?? '', sort_order: row.sort_order,
    };
    setForm(f); initialFormRef.current = f;
    setEditing(row.id);
    setDrawerOpen(true);
    setError(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editing) await updateProject(editing, form);
      else await addProject(form);
      closeDrawer();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const columns = [
    { key: 'image_url', label: 'Image',    render: (v) => v ? <img src={v} alt="" className="h-8 w-12 rounded-lg object-cover" /> : <span className="text-white/25">—</span> },
    { key: 'index',     label: '#' },
    { key: 'title',     label: 'Title' },
    { key: 'location',  label: 'Location', mobileHide: true },
    { key: 'type',      label: 'Type',     mobileHide: true },
    { key: 'metric',    label: 'Metric',   mobileHide: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Trends</h2>
          <p className="mt-0.5 text-sm text-white/40">Design trends shown in the scroll stack section.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </motion.div>

      {loading ? <p className="text-sm text-white/30">Loading…</p> : (
        <DataTable columns={columns} rows={projects} onEdit={openEdit} onDelete={deleteProject} onReorder={reorderProjects} emptyText="No work stack projects yet." />
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
              <h3 className="font-semibold text-white">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={tryClose} className="text-white/40 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSave} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
              <Field label="Index (e.g. 01)">
                <input className={inputCls} value={form.index} onChange={s('index')} placeholder="01" />
              </Field>
              <Field label="Title">
                <input className={inputCls} value={form.title} required onChange={s('title')} placeholder="Halo Suites" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Location">
                  <input className={inputCls} value={form.location} onChange={s('location')} placeholder="Seoul" />
                </Field>
                <Field label="Type">
                  <input className={inputCls} value={form.type} onChange={s('type')} placeholder="Boutique Hospitality" />
                </Field>
              </div>
              <Field label="Description">
                <textarea className={`${inputCls} min-h-[96px] resize-y`} value={form.description} onChange={s('description')} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Metric">
                  <input className={inputCls} value={form.metric} onChange={s('metric')} placeholder="+38% ADR" />
                </Field>
                <Field label="Metric Label">
                  <input className={inputCls} value={form.metric_label} onChange={s('metric_label')} placeholder="average daily rate lift" />
                </Field>
              </div>
              <div className="grid gap-4 grid-cols-3">
                <Field label="Palette From"><input type="color" className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-2 cursor-pointer" value={form.palette_from} onChange={s('palette_from')} /></Field>
                <Field label="Via"><input type="color" className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-2 cursor-pointer" value={form.palette_via} onChange={s('palette_via')} /></Field>
                <Field label="To"><input type="color" className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-2 cursor-pointer" value={form.palette_to} onChange={s('palette_to')} /></Field>
              </div>
              <Field label="Accent Color Class">
                <input className={inputCls} value={form.accent_color} onChange={s('accent_color')} placeholder="text-amber-300" />
              </Field>
              <Field label="Background Image (optional — replaces gradient)">
                <ImageUploader folder="workstack" value={form.image_url} onChange={(url) => setForm((f) => ({ ...f, image_url: url }))} />
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
