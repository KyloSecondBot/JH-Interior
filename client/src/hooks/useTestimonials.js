import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
      if (e) throw e;
      setTestimonials(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function addTestimonial(data) {
    const { data: row, error: e } = await supabase
      .from('testimonials')
      .insert(data)
      .select()
      .single();
    if (e) throw e;
    await fetchAll();
    return row;
  }

  async function updateTestimonial(id, data) {
    const { error: e } = await supabase
      .from('testimonials')
      .update(data)
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function deleteTestimonial(id) {
    const { error: e } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    if (e) throw e;
    await fetchAll();
  }

  async function reorderTestimonials(orderedRows) {
    const results = await Promise.all(
      orderedRows.map((row, i) => supabase.from('testimonials').update({ sort_order: i }).eq('id', row.id))
    );
    const err = results.find((r) => r.error)?.error;
    if (err) throw err;
    await fetchAll();
  }

  return { testimonials, loading, error, refetch: fetchAll, addTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials };
}
