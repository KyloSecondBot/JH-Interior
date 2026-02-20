import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function usePortfolio() {
  const [projects, setProjects]   = useState([]);
  const [gallery, setGallery]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [{ data: proj, error: e1 }, { data: gal, error: e2 }] = await Promise.all([
        supabase
          .from('portfolio_projects')
          .select('*, portfolio_tags(tag), portfolio_photos(id, image_url, caption, sort_order)')
          .order('sort_order', { ascending: true }),
        supabase
          .from('portfolio_gallery')
          .select('*')
          .order('sort_order', { ascending: true }),
      ]);
      if (e1) throw e1;
      if (e2) throw e2;
      setProjects(proj ?? []);
      setGallery(gal ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Mutations ──────────────────────────────────────────

  async function addProject(data) {
    const { tags, ...rest } = data;
    const { data: row, error: e } = await supabase
      .from('portfolio_projects')
      .insert(rest)
      .select()
      .single();
    if (e) throw e;
    if (tags?.length) {
      await supabase.from('portfolio_tags').insert(
        tags.map((tag) => ({ project_id: row.id, tag }))
      );
    }
    await fetchAll();
    return row;
  }

  async function updateProject(id, data) {
    const { tags, ...rest } = data;
    const { error: e } = await supabase
      .from('portfolio_projects')
      .update(rest)
      .eq('id', id);
    if (e) throw e;
    if (tags !== undefined) {
      await supabase.from('portfolio_tags').delete().eq('project_id', id);
      if (tags.length) {
        await supabase.from('portfolio_tags').insert(
          tags.map((tag) => ({ project_id: id, tag }))
        );
      }
    }
    await fetchAll();
  }

  async function deleteProject(id) {
    const { error: e } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function addGalleryItem(data) {
    const { data: row, error: e } = await supabase
      .from('portfolio_gallery')
      .insert(data)
      .select()
      .single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function updateGalleryItem(id, data) {
    const { error: e } = await supabase
      .from('portfolio_gallery')
      .update(data)
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function deleteGalleryItem(id) {
    const { error: e } = await supabase
      .from('portfolio_gallery')
      .delete()
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function addPhoto(projectId, { image_url, caption = '', sort_order = 0 }) {
    const { data: row, error: e } = await supabase
      .from('portfolio_photos')
      .insert({ project_id: projectId, image_url, caption, sort_order })
      .select()
      .single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function deletePhoto(id) {
    const { error: e } = await supabase
      .from('portfolio_photos')
      .delete()
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  return {
    projects, gallery, loading, error, refetch: fetchAll,
    addProject, updateProject, deleteProject,
    addGalleryItem, updateGalleryItem, deleteGalleryItem,
    addPhoto, deletePhoto,
  };
}
