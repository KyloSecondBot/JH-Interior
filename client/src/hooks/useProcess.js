import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useProcess() {
  const [steps, setSteps]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('process_steps')
        .select('*')
        .order('sort_order', { ascending: true });
      if (e) throw e;
      setSteps(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function addStep(data) {
    const { data: row, error: e } = await supabase.from('process_steps').insert(data).select().single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function updateStep(id, data) {
    const { error: e } = await supabase.from('process_steps').update(data).eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function deleteStep(id) {
    const { error: e } = await supabase.from('process_steps').delete().eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function reorderSteps(orderedRows) {
    const results = await Promise.all(
      orderedRows.map((row, i) => supabase.from('process_steps').update({ sort_order: i }).eq('id', row.id))
    );
    const err = results.find((r) => r.error)?.error;
    if (err) throw err;
    await fetchAll();
  }

  return { steps, loading, error, refetch: fetchAll, addStep, updateStep, deleteStep, reorderSteps };
}
