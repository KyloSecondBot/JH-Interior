import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useStats() {
  const [stats, setStats]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('studio_stats')
        .select('*')
        .order('sort_order', { ascending: true });
      if (e) throw e;
      setStats(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function addStat(data) {
    const { data: row, error: e } = await supabase
      .from('studio_stats')
      .insert(data)
      .select()
      .single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function updateStat(id, data) {
    const { error: e } = await supabase
      .from('studio_stats')
      .update(data)
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function deleteStat(id) {
    const { error: e } = await supabase
      .from('studio_stats')
      .delete()
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  return { stats, loading, error, refetch: fetchAll, addStat, updateStat, deleteStat };
}
