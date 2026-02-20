import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, MapPin, Tag, BarChart2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ── Helpers ── */
function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

/* ── Lightbox ── */
function Lightbox({ photos, index, onClose, onNext, onPrev }) {
  useLockBodyScroll(true);

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const photo = photos[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Image */}
      <motion.div
        key={index}
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image_url}
          alt={photo.caption}
          className="max-h-[80vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
        />
        {photo.caption && (
          <p className="mt-3 text-center text-sm text-white/60">{photo.caption}</p>
        )}
      </motion.div>

      {/* Controls */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40">
            {index + 1} / {photos.length}
          </p>
        </>
      )}
    </motion.div>
  );
}

/* ── Photo grid item ── */
function PhotoCard({ photo, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.45, delay: index * 0.055 }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={photo.image_url}
          alt={photo.caption}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            View
          </span>
        </div>
      </div>
      {photo.caption && (
        <div className="bg-white/3 px-3 py-2">
          <p className="text-xs text-white/50">{photo.caption}</p>
        </div>
      )}
    </motion.div>
  );
}

/* ── Main page ── */
export default function WorkPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*, portfolio_tags(tag), portfolio_photos(id, image_url, caption, sort_order)')
        .eq('id', id)
        .single();
      if (error || !data) {
        setNotFound(true);
      } else {
        setProject(data);
        const sorted = [...(data.portfolio_photos ?? [])].sort((a, b) => a.sort_order - b.sort_order);
        setPhotos(sorted);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const nextPhoto = () => setLightboxIdx((i) => (i + 1) % photos.length);
  const prevPhoto = () => setLightboxIdx((i) => (i - 1 + photos.length) % photos.length);

  /* Loading */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  /* 404 */
  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#080808] text-white">
        <p className="text-lg font-semibold text-white/60">Project not found</p>
        <Link to="/#portfolio" className="text-amber-400 hover:underline text-sm">← Back to portfolio</Link>
      </div>
    );
  }

  const tags = project.portfolio_tags?.map((t) => t.tag) ?? [];

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
        )}
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-black/10`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.overlay_gradient ?? 'from-black/60 via-black/30 to-transparent'} opacity-60`} />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute left-6 top-6 z-10"
        >
          <Link
            to="/#portfolio"
            className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
        </motion.div>

        {/* Title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="absolute bottom-10 left-0 right-0 px-6 sm:px-12"
        >
          <div className="mx-auto max-w-5xl">
            {project.location && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80">
                {project.location}
              </p>
            )}
            <h1 className="font-['Playfair_Display',serif] text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ── Info bar ── */}
      <section className="border-b border-white/8 bg-white/3 px-6 py-5 sm:px-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-6 text-sm">
          {project.location && (
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4 text-amber-400/60" />
              {project.location}
            </div>
          )}
          {project.type && (
            <div className="flex items-center gap-2 text-white/60">
              <Tag className="h-4 w-4 text-amber-400/60" />
              {project.type}
            </div>
          )}
          {project.metric_label && project.metric_value && (
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-amber-400/60" />
              <span className="text-white/60">{project.metric_label}:</span>
              <span className="font-semibold text-amber-300">{project.metric_value}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── About ── */}
      {(project.summary || tags.length > 0) && (
        <section className="px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-5xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              {project.summary && (
                <p className="max-w-2xl text-lg leading-relaxed text-white/70">{project.summary}</p>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-medium text-amber-300/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Photo grid ── */}
      <section className="px-6 pb-20 sm:px-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Gallery</p>
            <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">Inside the project.</h2>
          </motion.div>

          {photos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-white/8 bg-white/3 py-16 text-center"
            >
              <p className="text-sm text-white/30">Gallery coming soon.</p>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, i) => (
                <PhotoCard key={photo.id} photo={photo} index={i} onClick={() => openLightbox(i)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIdx}
            onClose={closeLightbox}
            onNext={nextPhoto}
            onPrev={prevPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
