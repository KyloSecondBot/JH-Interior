import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Images, Trash2, Upload, ImageOff } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useUnsavedGuard } from '../../hooks/useUnsavedGuard';
import DataTable from '../../components/dashboard/DataTable';
import UnsavedModal from '../../components/dashboard/UnsavedModal';
import ImageUploader from '../../components/dashboard/ImageUploader';

/* ── Shared styles ── */
const inputCls = 'rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-400/50 transition';

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {children}
    </div>
  );
}

const EMPTY_PROJECT = {
  title: '', location: '', type: '', summary: '',
  metric_label: '', metric_value: '',
  image_url: '',
  overlay_gradient: 'from-black/80 via-black/60 to-black/90',
  accent_color: 'bg-white/55',
  sort_order: 0,
  tags: [],
};

const EMPTY_GALLERY = {
  title: '', caption: '', image_url: '',
  tone_gradient: 'from-black/60 via-black/35 to-black/70',
  sort_order: 0,
};

const MAX_PHOTOS = 12;

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

/* ═══════════════════════════════════════════════════════════
   PHOTO MANAGER MODAL
   Mobile : full-screen, tab bar (Gallery | Add Photo)
   Desktop: two-panel side-by-side
   ═══════════════════════════════════════════════════════════ */
function PhotoManagerModal({ projectTitle, projectId, photos, addPhoto, deletePhoto, onClose }) {
  const [newUrl, setNewUrl]         = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [saving, setSaving]         = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [err, setErr]               = useState(null);
  // Mobile tab: 'gallery' | 'upload'
  const [mobileTab, setMobileTab]   = useState('gallery');

  async function handleAdd() {
    if (!newUrl) return;
    setSaving(true);
    setErr(null);
    try {
      await addPhoto(projectId, {
        image_url: newUrl,
        caption: newCaption,
        sort_order: photos.length,
      });
      setNewUrl('');
      setNewCaption('');
      // After adding, switch back to gallery so admin can see what they just added
      setMobileTab('gallery');
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    setErr(null);
    try { await deletePhoto(id); }
    catch (e) { setErr(e.message); }
    finally { setDeletingId(null); }
  }

  const atLimit = photos.length >= MAX_PHOTOS;

  /* ── Reusable photo grid ── */
  const PhotoGrid = () => (
    photos.length === 0 ? (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
          <ImageOff className="h-7 w-7 text-white/20" />
        </div>
        <div className="text-center">
          <p className="font-medium text-white/50">No photos yet</p>
          <p className="mt-1 text-sm text-white/25">
            {/* hint differs by breakpoint */}
            <span className="sm:hidden">Tap "Add Photo" below to get started</span>
            <span className="hidden sm:inline">Upload photos using the panel on the right</span>
          </p>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((ph, i) => (
          <motion.div
            key={ph.id}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/3"
          >
            <div className="relative">
              <img
                src={ph.image_url}
                alt={ph.caption || `Photo ${i + 1}`}
                className="h-32 w-full object-cover sm:h-40"
                loading="lazy"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white/70 backdrop-blur-sm">
                #{i + 1}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <p className="flex-1 truncate text-xs text-white/50">
                {ph.caption || <span className="italic text-white/20">No caption</span>}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(ph.id)}
                disabled={deletingId === ph.id}
                className="flex shrink-0 items-center gap-1 rounded-lg bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-400 transition active:bg-red-500/30 hover:bg-red-500/20 disabled:opacity-40"
              >
                {deletingId === ph.id
                  ? <span className="h-3 w-3 animate-spin rounded-full border border-red-400 border-t-transparent" />
                  : <Trash2 className="h-3 w-3" />}
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    )
  );

  /* ── Reusable upload form ── */
  const UploadForm = () => (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/70">Add New Photo</p>

      {atLimit ? (
        <p className="rounded-xl bg-amber-400/10 px-4 py-3 text-sm text-amber-300/80 text-center">
          Maximum of {MAX_PHOTOS} photos reached.<br />Delete one to add more.
        </p>
      ) : (
        <>
          <ImageUploader
            folder="portfolio-photos"
            value={newUrl}
            onChange={(url) => setNewUrl(url)}
          />
          <Field label="Caption (optional)">
            <input
              className={inputCls}
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="e.g. Living room detail"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
            />
          </Field>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!newUrl || saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300 active:scale-95 disabled:opacity-40"
          >
            {saving
              ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              : <Upload className="h-4 w-4" />}
            {saving ? 'Saving…' : 'Add Photo'}
          </button>
        </>
      )}

      {err && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-400">{err}</p>}

      <div className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Tips</p>
        <ul className="space-y-1 text-xs text-white/35">
          <li>• Photos appear in the order added</li>
          <li>• Max {MAX_PHOTOS} photos per project</li>
          <li>• Best ratio: 4:3 or 3:2</li>
        </ul>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      /* Full-screen on mobile, centered overlay on desktop */
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
    >
      {/* Backdrop — only tappable on desktop (mobile full-screen has no room) */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md sm:block hidden" onClick={onClose} />
      <div className="absolute inset-0 bg-black/80 sm:hidden" />

      {/* Modal shell */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        /* Mobile: slides up from bottom, full height
           Desktop: centered, fixed max-width, spring scale */
        className="relative flex w-full flex-col bg-[#0e0e0e]
                   h-[92dvh] rounded-t-3xl
                   sm:h-auto sm:max-h-[calc(100vh-48px)] sm:rounded-3xl sm:max-w-4xl
                   sm:border sm:border-white/10 sm:shadow-2xl"
      >
        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 sm:h-9 sm:w-9">
              <Images className="h-4 w-4 text-amber-400 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white sm:text-base">Project Photos</h2>
              <p className="text-xs text-white/40 truncate max-w-[160px] sm:max-w-xs">{projectTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold sm:px-4 sm:py-1.5 sm:text-sm ${
              atLimit ? 'bg-amber-400/20 text-amber-300' : 'bg-white/8 text-white/60'
            }`}>
              {photos.length}/{MAX_PHOTOS}
            </span>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 p-2 text-white/40 transition hover:text-white"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* ── Mobile tab bar ── */}
        <div className="flex shrink-0 border-b border-white/8 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileTab('gallery')}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 ${
              mobileTab === 'gallery'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-white/40'
            }`}
          >
            <Images className="h-4 w-4" />
            Gallery ({photos.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('upload')}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 ${
              mobileTab === 'upload'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-white/40'
            }`}
          >
            <Upload className="h-4 w-4" />
            Add Photo
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex min-h-0 flex-1 overflow-hidden">

          {/* Gallery panel — full width on mobile (tab-controlled), left panel on desktop */}
          <div className={`flex-1 overflow-y-auto p-4 sm:p-8 ${mobileTab === 'upload' ? 'hidden sm:block' : ''}`}>
            <PhotoGrid />
          </div>

          {/* Upload panel — full width on mobile (tab-controlled), right panel on desktop */}
          <div className={`overflow-y-auto border-white/8 bg-white/2 p-5 sm:p-6
                          sm:flex sm:w-80 sm:shrink-0 sm:flex-col sm:border-l
                          ${mobileTab === 'gallery' ? 'hidden sm:flex' : 'flex flex-col w-full'}`}>
            <UploadForm />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex shrink-0 items-center justify-between border-t border-white/8 px-5 py-3 sm:px-8 sm:py-4">
          <p className="text-xs text-white/30 hidden sm:block">
            {photos.length === 0
              ? 'No photos — visitors see "Gallery coming soon"'
              : `${photos.length} photo${photos.length !== 1 ? 's' : ''} on the public page`}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-white/8 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/12 hover:text-white"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function PortfolioPage() {
  const {
    projects, gallery, loading,
    addProject, updateProject, deleteProject,
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    addPhoto, deletePhoto,
  } = usePortfolio();

  const [tab, setTab] = useState('projects');

  // Project form state
  const [projForm, setProjForm]       = useState(EMPTY_PROJECT);
  const [editingProj, setEditingProj] = useState(null);
  const [projDrawer, setProjDrawer]   = useState(false);
  const [projSaving, setProjSaving]   = useState(false);
  const [projError, setProjError]     = useState(null);

  // Photo manager state
  const [photoModalId, setPhotoModalId] = useState(null); // project id whose photos we're managing

  // Gallery form state
  const [galForm, setGalForm]         = useState(EMPTY_GALLERY);
  const [editingGal, setEditingGal]   = useState(null);
  const [galDrawer, setGalDrawer]     = useState(false);
  const [galSaving, setGalSaving]     = useState(false);
  const [galError, setGalError]       = useState(null);
  useUnsavedGuard(projDrawer || galDrawer || !!photoModalId);

  // Discard guards — proj drawer
  const initialProjRef = useRef(null);
  const [showDiscardProj, setShowDiscardProj] = useState(false);
  function isProjDirty() { return JSON.stringify(projForm) !== JSON.stringify(initialProjRef.current); }
  function closeProjDrawer() { setProjDrawer(false); setShowDiscardProj(false); }
  function tryCloseProj() { if (isProjDirty()) setShowDiscardProj(true); else closeProjDrawer(); }

  // Discard guards — gallery drawer
  const initialGalRef = useRef(null);
  const [showDiscardGal, setShowDiscardGal] = useState(false);
  function isGalDirty() { return JSON.stringify(galForm) !== JSON.stringify(initialGalRef.current); }
  function closeGalDrawer() { setGalDrawer(false); setShowDiscardGal(false); }
  function tryCloseGal() { if (isGalDirty()) setShowDiscardGal(true); else closeGalDrawer(); }

  /* ── Project handlers ── */
  function openAddProj() {
    setProjForm(EMPTY_PROJECT); initialProjRef.current = EMPTY_PROJECT;
    setEditingProj(null);
    setProjDrawer(true);
    setProjError(null);
  }
  function openEditProj(row) {
    const f = {
      title: row.title, location: row.location, type: row.type, summary: row.summary,
      metric_label: row.metric_label, metric_value: row.metric_value,
      image_url: row.image_url,
      overlay_gradient: row.overlay_gradient,
      accent_color: row.accent_color,
      sort_order: row.sort_order,
      tags: row.portfolio_tags?.map((t) => t.tag) ?? [],
    };
    setProjForm(f); initialProjRef.current = f;
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
      closeProjDrawer();
    } catch (err) {
      setProjError(err.message);
    } finally {
      setProjSaving(false);
    }
  }

  /* ── Gallery handlers ── */
  function openAddGal() {
    setGalForm(EMPTY_GALLERY); initialGalRef.current = EMPTY_GALLERY;
    setEditingGal(null);
    setGalDrawer(true);
    setGalError(null);
  }
  function openEditGal(row) {
    const f = { title: row.title, caption: row.caption, image_url: row.image_url, tone_gradient: row.tone_gradient, sort_order: row.sort_order };
    setGalForm(f); initialGalRef.current = f;
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
      closeGalDrawer();
    } catch (err) {
      setGalError(err.message);
    } finally {
      setGalSaving(false);
    }
  }

  // Resolve photo modal project
  const photoModalProject = photoModalId ? projects.find((p) => p.id === photoModalId) : null;

  const projColumns = [
    { key: 'image_url',    label: 'Image',    render: (v) => v ? <img src={v} alt="" className="h-8 w-12 rounded-lg object-cover" /> : <span className="text-white/25">—</span> },
    { key: 'title',        label: 'Title' },
    { key: 'location',     label: 'Location', mobileHide: true },
    { key: 'type',         label: 'Type',     mobileHide: true },
    { key: 'metric_value', label: 'Metric',   mobileHide: true },
    {
      key: 'id',
      label: 'Photos',
      render: (_, row) => {
        const count = row.portfolio_photos?.length ?? 0;
        return (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPhotoModalId(row.id); }}
            className="flex items-center gap-1.5 rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/20"
          >
            <Images className="h-3.5 w-3.5" />
            {count}
          </button>
        );
      },
    },
    { key: 'sort_order', label: 'Order', mobileHide: true },
  ];

  const galColumns = [
    { key: 'image_url', label: 'Image',   render: (v) => v ? <img src={v} alt="" className="h-8 w-12 rounded-lg object-cover" /> : <span className="text-white/25">—</span> },
    { key: 'title',     label: 'Title' },
    { key: 'caption',   label: 'Caption', mobileHide: true },
    { key: 'sort_order',label: 'Order',   mobileHide: true },
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

      {/* ── Project drawer ── */}
      <Drawer title={editingProj ? 'Edit Project' : 'Add Project'} open={projDrawer} onClose={tryCloseProj}>
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
          <Field label="Cover Image">
            <ImageUploader folder="portfolio" value={projForm.image_url} onChange={(url) => setProjForm((f) => ({ ...f, image_url: url }))} />
          </Field>
          <Field label="Overlay Gradient (Tailwind)">
            <input className={inputCls} value={projForm.overlay_gradient} onChange={(e) => setProjForm((f) => ({ ...f, overlay_gradient: e.target.value }))} placeholder="from-black/80 via-black/60 to-black/90" />
          </Field>
          <Field label="Sort Order">
            <input type="number" className={inputCls} value={projForm.sort_order} onChange={(e) => setProjForm((f) => ({ ...f, sort_order: +e.target.value }))} />
          </Field>

          {/* Photos CTA — only when editing an existing project */}
          {editingProj && (() => {
            const proj = projects.find((p) => p.id === editingProj);
            const count = proj?.portfolio_photos?.length ?? 0;
            return (
              <button
                type="button"
                onClick={() => setPhotoModalId(editingProj)}
                className="flex w-full items-center justify-between rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3.5 text-sm transition hover:bg-amber-400/10"
              >
                <span className="flex items-center gap-2.5 font-medium text-amber-300">
                  <Images className="h-4 w-4" />
                  Manage Project Photos
                </span>
                <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">
                  {count} / {MAX_PHOTOS}
                </span>
              </button>
            );
          })()}

          {projError && <p className="text-sm text-red-400">{projError}</p>}
          <div className="mt-auto flex gap-3">
            <button type="button" onClick={tryCloseProj} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={projSaving} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">
              {projSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </Drawer>

      {/* ── Gallery drawer ── */}
      <Drawer title={editingGal ? 'Edit Gallery Item' : 'Add Gallery Item'} open={galDrawer} onClose={tryCloseGal}>
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
            <button type="button" onClick={tryCloseGal} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">Cancel</button>
            <button type="submit" disabled={galSaving} className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">
              {galSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </Drawer>

      {/* ── Photo Manager Modal ── */}
      <AnimatePresence>
        {photoModalId && photoModalProject && (
          <PhotoManagerModal
            projectTitle={photoModalProject.title}
            projectId={photoModalId}
            photos={photoModalProject.portfolio_photos ?? []}
            addPhoto={addPhoto}
            deletePhoto={deletePhoto}
            onClose={() => setPhotoModalId(null)}
          />
        )}
      </AnimatePresence>
      {showDiscardProj && (
        <UnsavedModal
          title="Discard changes?"
          message="Your unsaved edits will be lost."
          leaveLabel="Discard"
          stayLabel="Keep editing"
          onLeave={closeProjDrawer}
          onStay={() => setShowDiscardProj(false)}
        />
      )}
      {showDiscardGal && (
        <UnsavedModal
          title="Discard changes?"
          message="Your unsaved edits will be lost."
          leaveLabel="Discard"
          stayLabel="Keep editing"
          onLeave={closeGalDrawer}
          onStay={() => setShowDiscardGal(false)}
        />
      )}
    </div>
  );
}
