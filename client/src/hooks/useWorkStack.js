import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useWorkStack() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('workstack_projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (e) throw e;
      setProjects(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function addProject(data) {
    const { data: row, error: e } = await supabase
      .from('workstack_projects')
      .insert(data)
      .select()
      .single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function updateProject(id, data) {
    const { error: e } = await supabase
      .from('workstack_projects')
      .update(data)
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function deleteProject(id) {
    const { error: e } = await supabase
      .from('workstack_projects')
      .delete()
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  return { projects, loading, error, refetch: fetchAll, addProject, updateProject, deleteProject };
}
