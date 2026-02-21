import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (e) throw e;
      setServices(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function addService(data) {
    const { data: row, error: e } = await supabase.from('services').insert(data).select().single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function updateService(id, data) {
    const { error: e } = await supabase.from('services').update(data).eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function deleteService(id) {
    const { error: e } = await supabase.from('services').delete().eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function reorderServices(orderedRows) {
    const results = await Promise.all(
      orderedRows.map((row, i) => supabase.from('services').update({ sort_order: i }).eq('id', row.id))
    );
    const err = results.find((r) => r.error)?.error;
    if (err) throw err;
    await fetchAll();
  }

  return { services, loading, error, refetch: fetchAll, addService, updateService, deleteService, reorderServices };
}
