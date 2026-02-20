import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Image as ImageIcon, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import DataTable from '../../components/dashboard/DataTable';
import ImageUploader from '../../components/dashboard/ImageUploader';

/* ── Shared styles ── */
const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </label>
  );
}

/* ── Project empty state ── */
const EMPTY_PROJECT = {
  title: '', location: '', type: '', summary: '',
  metric_label: '', metric_value: '',
  image_url: '',
  overlay_gradient: 'from-black/80 via-black/60 to-black/90',
  accent_color: 'bg-white/55',
  sort_order: 0,
  tags: [],
};

/* ── Gallery empty state ── */
const EMPTY_GALLERY = {
  title: '', caption: '', image_url: '',
  tone_gradient: 'from-black/60 via-black/35 to-black/70',
  sort_order: 0,
};

/* ── Slide-over drawer shell ── */
function Drawer({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.aside
        initial={{ x: '100%' }} animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        className="relative ml-auto flex h-full w-full max-w-lg flex-col border-l border-white/8 bg-[#0e0e0e] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </motion.aside>
    </div>
  );
}

/* ── Tabs ── */
function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition
        ${active ? 'bg-amber-400/10 text-amber-300' : 'text-white/40 hover:text-white/70'}`}
    >
      {children}
    </button>
  );
}

/* ── Project Photos sub-section ── */
const MAX_PHOTOS = 12;

function ProjectPhotos({ projectId, photos = [], addPhoto, deletePhoto }) {
  const [open, setOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function handleAdd() {
    if (!newUrl) return;
    setSaving(true);
    setErr(null);
    try {
      await addPhoto(projectId, { image_url: newUrl, caption: newCaption, sort_order: photos.length });
      setNewUrl('');
      setNewCaption('');
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try { await deletePhoto(id); }
    catch (e) { setErr(e.message); }
    finally { setDeletingId(null); }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-white/70 hover:text-white transition"
      >
        <span className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-amber-400/60" />
          Project Photos
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
            {photos.length} / {MAX_PHOTOS}
          </span>
        </span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {open && (
        <div className="space-y-3 border-t border-white/8 px-4 pb-4 pt-3">
          {photos.length === 0 && (
            <p className="text-xs text-white/30">No photos yet. Add up to {MAX_PHOTOS}.</p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {photos.map((ph) => (
              <div key={ph.id} className="group relative rounded-lg overflow-hidden border border-white/10">
                <img src={ph.image_url} alt={ph.caption} className="h-16 w-full object-cover" />
                {ph.caption && (
                  <p className="truncate bg-black/60 px-1.5 py-0.5 text-[10px] text-white/60">{ph.caption}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(ph.id)}
                  disabled={deletingId === ph.id}
                  className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5 text-white/60 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {photos.length < MAX_PHOTOS && (
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Add Photo</p>
              <ImageUploader
                folder="portfolio-photos"
                value={newUrl}
                onChange={(url) => setNewUrl(url)}
              />
              <input
                className={inputCls}
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Caption (optional)"
              />
              <button
                type="button"
                onClick={handleAdd}
                disabled={!newUrl || saving}
                className="w-full rounded-xl bg-amber-400/10 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-400/20 disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Add Photo'}
              </button>
            </div>
          )}

          {err && <p className="text-xs text-red-400">{err}</p>}
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const { projects, gallery, loading, addProject, updateProject, deleteProject, addGalleryItem, updateGalleryItem, deleteGalleryItem, addPhoto, deletePhoto } = usePortfolio();
  const [tab, setTab] = useState('projects');

  // Project form state
  const [projForm, setProjForm]     = useState(EMPTY_PROJECT);
  const [editingProj, setEditingProj] = useState(null);
  const [projDrawer, setProjDrawer]   = useState(false);
  const [projSaving, setProjSaving]   = useState(false);
  const [projError, setProjError]     = useState(null);

  // Gallery form state
  const [galForm, setGalForm]       = useState(EMPTY_GALLERY);
  const [editingGal, setEditingGal]   = useState(null);
  const [galDrawer, setGalDrawer]     = useState(false);
  const [galSaving, setGalSaving]     = useState(false);
  const [galError, setGalError]       = useState(null);

  /* ── Project handlers ── */
  function openAddProj() {
    setProjForm(EMPTY_PROJECT);
    setEditingProj(null);
    setProjDrawer(true);
    setProjError(null);
  }
  function openEditProj(row) {
    setProjForm({
      title: row.title, location: row.location, type: row.type, summary: row.summary,
      metric_label: row.metric_label, metric_value: row.metric_value,
      image_url: row.image_url,
      overlay_gradient: row.overlay_gradient,
      accent_color: row.accent_color,
      sort_order: row.sort_order,
      tags: row.portfolio_tags?.map((t) => t.tag) ?? [],
    });
    setEditingProj(row.id);
    setProjDrawer(true);
    setProjError(null);
  }
  async function handleSaveProj(e) {
    e.preventDefault();
    setProjSaving(true);
    setProjError(null);
    try {
      if (editingProj) await updateProject(editingProj, projForm);
      else await addProject(projForm);
      setProjDrawer(false);
    } catch (err) {
      setProjError(err.message);
    } finally {
      setProjSaving(false);
    }
  }

  /* ── Gallery handlers ── */
  function openAddGal() {
    setGalForm(EMPTY_GALLERY);
    setEditingGal(null);
    setGalDrawer(true);
    setGalError(null);
  }
  function openEditGal(row) {
    setGalForm({ title: row.title, caption: row.caption, image_url: row.image_url, tone_gradient: row.tone_gradient, sort_order: row.sort_order });
    setEditingGal(row.id);
    setGalDrawer(true);
    setGalError(null);
  }
  async function handleSaveGal(e) {
    e.preventDefault();
    setGalSaving(true);
    setGalError(null);
    try {
      if (editingGal) await updateGalleryItem(editingGal, galForm);
      else await addGalleryItem(galForm);
      setGalDrawer(false);
    } catch (err) {
      setGalError(err.message);
    } finally {
      setGalSaving(false);
    }
  }

  const projColumns = [
    { key: 'image_url',    label: 'Image', render: (v) => v ? <img src={v} alt="" className="h-8 w-12 rounded-lg object-cover" /> : <span className="text-white/25">—</span> },
    { key: 'title',        label: 'Title' },
    { key: 'location',     label: 'Location' },
    { key: 'type',         label: 'Type' },
    { key: 'metric_value', label: 'Metric' },
    { key: 'sort_order',   label: 'Order' },
  ];

  const galColumns = [
    { key: 'image_url', label: 'Image', render: (v) => v ? <img src={v} alt="" className="h-8 w-12 rounded-lg object-cover" /> : <span className="text-white/25">—</span> },
    { key: 'title',     label: 'Title' },
    { key: 'caption',   label: 'Caption' },
    { key: 'sort_order',label: 'Order' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Portfolio</h2>
          <p className="mt-0.5 text-sm text-white/40">Spotlight projects and gallery rail on the homepage.</p>
        </div>
        <button
          onClick={tab === 'projects' ? openAddProj : openAddGal}
          className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          <Plus className="h-4 w-4" />
          {tab === 'projects' ? 'Add Project' : 'Add Gallery Item'}
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Tab active={tab === 'projects'} onClick={() => setTab('projects')}>Spotlight Projects</Tab>
        <Tab active={tab === 'gallery'}  onClick={() => setTab('gallery')}>Gallery Rail</Tab>
      </div>

      {loading ? (
        <p className="text-sm text-white/30">Loading…</p>
      ) : tab === 'projects' ? (
        <DataTable columns={projColumns} rows={projects} onEdit={openEditProj} onDelete={deleteProject} emptyText="No portfolio projects yet." />
      ) : (
        <DataTable columns={galColumns} rows={gallery} onEdit={openEditGal} onDelete={deleteGalleryItem} emptyText="No gallery items yet." />
      )}

      {/* Project drawer */}
      <Drawer title={editingProj ? 'Edit Project' : 'Add Project'} open={projDrawer} onClose={() => setProjDrawer(false)}>
        <form onSubmit={handleSaveProj} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          <Field label="Title">
            <input className={inputCls} value={projForm.title} required onChange={(e) => setProjForm((f) => ({ ...f, title: e.target.value }))} placeholder="Halo Suites" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location">
              <input className={inputCls} value={projForm.location} onChange={(e) => setProjForm((f) => ({ ...f, location: e.target.value }))} placeholder="Seoul" />
            </Field>
            <Field label="Type">
              <input className={inputCls} value={projForm.type} onChange={(e) => setProjForm((f) => ({ ...f, type: e.target.value }))} placeholder="Boutique Hospitality" />
            </Field>
          </div>
          <Field label="Summary">
            <textarea className={`${inputCls} min-h-[80px] resize-y`} value={projForm.summary} onChange={(e) => setProjForm((f) => ({ ...f, summary: e.target.value }))} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Metric Label">
              <input className={inputCls} value={projForm.metric_label} onChange={(e) => setProjForm((f) => ({ ...f, metric_label: e.target.value }))} placeholder="ADR lift" />
            </Field>
            <Field label="Metric Value">
              <input className={inputCls} value={projForm.metric_value} onChange={(e) => setProjForm((f) => ({ ...f, metric_value: e.target.value }))} placeholder="+38%" />
            </Field>
          </div>
          <Field label="Tags (comma-separated)">
            <input
              className={inputCls}
              value={projForm.tags.join(', ')}
              onChange={(e) => setProjForm((f) => ({ ...f, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }))}
              placeholder="Motion lighting, Gallery curation"
            />
          </Field>
          <Field label="Image">
            <ImageUploader folder="portfolio" value={projForm.image_url} onChange={(url) => setProjForm((f) => ({ ...f, image_url: url }))} />
          </Field>
          <Field label="Overlay Gradient (Tailwind)">
            <input className={inputCls} value={projForm.overlay_gradient} onChange={(e) => setProjForm((f) => ({ ...f, overlay_gradient: e.target.value }))} placeholder="from-black/80 via-black/60 to-black/90" />
          </Field>
          <Field label="Sort Order">
            <input type="number" className={inputCls} value={projForm.sort_order} onChange={(e) => setProjForm((f) => ({ ...f, sort_order: +e.target.value }))} />
          </Field>

          {editingProj && (() => {
            const proj = projects.find((p) => p.id === editingProj);
            return (
              <ProjectPhotos
                projectId={editingProj}
                photos={proj?.portfolio_photos ?? []}
                addPhoto={addPhoto}
                deletePhoto={deletePhoto}
              />
            );
          })()}

          {projError && <p className="text-sm text-red-400">{projError}</p>}
          <div className="mt-auto flex gap-3">
            <button type="button" onClick={() => setProjDrawer(false)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={projSaving} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">
              {projSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </Drawer>

      {/* Gallery drawer */}
      <Drawer title={editingGal ? 'Edit Gallery Item' : 'Add Gallery Item'} open={galDrawer} onClose={() => setGalDrawer(false)}>
        <form onSubmit={handleSaveGal} className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          <Field label="Title">
            <input className={inputCls} value={galForm.title} required onChange={(e) => setGalForm((f) => ({ ...f, title: e.target.value }))} placeholder="Drift Spa" />
          </Field>
          <Field label="Caption">
            <input className={inputCls} value={galForm.caption} onChange={(e) => setGalForm((f) => ({ ...f, caption: e.target.value }))} placeholder="Vapor glass + ripple light" />
          </Field>
          <Field label="Image">
            <ImageUploader folder="gallery" value={galForm.image_url} onChange={(url) => setGalForm((f) => ({ ...f, image_url: url }))} />
          </Field>
          <Field label="Tone Gradient (Tailwind)">
            <input className={inputCls} value={galForm.tone_gradient} onChange={(e) => setGalForm((f) => ({ ...f, tone_gradient: e.target.value }))} placeholder="from-black/60 via-black/35 to-black/70" />
          </Field>
          <Field label="Sort Order">
            <input type="number" className={inputCls} value={galForm.sort_order} onChange={(e) => setGalForm((f) => ({ ...f, sort_order: +e.target.value }))} />
          </Field>

          {galError && <p className="text-sm text-red-400">{galError}</p>}
          <div className="mt-auto flex gap-3">
            <button type="button" onClick={() => setGalDrawer(false)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={galSaving} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">
              {galSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
