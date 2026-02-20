import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

/**
 * Drag-and-drop image uploader using Supabase Storage.
 *
 * Props:
 *  folder      — storage folder e.g. 'portfolio', 'gallery', 'workstack'
 *  value       — current image URL
 *  onChange    — (url: string) => void
 *  className   — extra class names
 */
export default function ImageUploader({ folder = 'portfolio', value, onChange, className = '' }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  async function uploadFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split('.').pop();
      const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('media')
        .upload(name, file, { cacheControl: '3600', upsert: false });
      if (uploadErr) throw uploadErr;

      const { data } = supabase.storage.from('media').getPublicUrl(name);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    uploadFile(file);
  }

  function handleChange(e) {
    uploadFile(e.target.files[0]);
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white/70 transition hover:text-white opacity-0 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 transition
            ${dragging ? 'border-amber-400/60 bg-amber-400/5' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'}`}
        >
          {uploading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          ) : (
            <Upload className="h-5 w-5 text-white/30" />
          )}
          <p className="text-xs text-white/40">
            {uploading ? 'Uploading…' : 'Drop image here or click to browse'}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {/* Manual URL fallback */}
      <input
        type="url"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL…"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 placeholder-white/25 outline-none focus:border-amber-400/50 focus:ring-0"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
