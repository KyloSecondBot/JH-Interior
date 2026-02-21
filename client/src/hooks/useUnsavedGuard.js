import { useEffect } from 'react';
import { useUnsavedChanges } from '../context/UnsavedChangesContext';

/**
 * Call this inside any dashboard page to register unsaved-changes state.
 * Navigation interception is handled by DashboardSidebar + DashboardLayout.
 */
export function useUnsavedGuard(isDirty) {
  const { setIsDirty } = useUnsavedChanges();

  // Sync dirty flag into shared context
  useEffect(() => {
    setIsDirty(isDirty);
    return () => setIsDirty(false); // clear on unmount
  }, [isDirty, setIsDirty]);

  // Also block browser tab close / refresh
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);
}
