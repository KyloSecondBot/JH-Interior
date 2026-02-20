import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useContact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchContact = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from('contact_info')
        .select('*')
        .eq('id', 1)
        .single();
      if (e) throw e;
      setContact(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContact(); }, [fetchContact]);

  async function updateContact(data) {
    const { error: e } = await supabase
      .from('contact_info')
      .upsert({ id: 1, ...data });
    if (e) throw e;
    await fetchContact();
  }

  return { contact, loading, error, refetch: fetchContact, updateContact };
}
