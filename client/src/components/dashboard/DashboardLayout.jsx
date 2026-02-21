import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import { UnsavedChangesProvider, useUnsavedChanges } from '../../context/UnsavedChangesContext';
import UnsavedModal from './UnsavedModal';

const pageTitle = {
  '/dashboard':              'Overview',
  '/dashboard/portfolio':    'Portfolio',
  '/dashboard/workstack':    'Trends',
  '/dashboard/services':     'Services',
  '/dashboard/process':      'Process Steps',
  '/dashboard/testimonials': 'Testimonials',
  '/dashboard/stats':        'Stats',
  '/dashboard/contact':      'Contact',
};

// Inner component lives inside the provider so it can read context
function DashboardInner() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pendingAction, setPendingAction, setIsDirty } = useUnsavedChanges();

  function confirmLeave() {
    setIsDirty(false);
    const action = pendingAction;
    setPendingAction(null);
    setSidebarOpen(false);
    action?.();
  }

  function cancelLeave() {
    setPendingAction(null);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#080808] text-white font-sans">
      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex lg:shrink-0">
        <DashboardSidebar />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            >
              <DashboardSidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/8 px-5">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/5 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-semibold text-white">
              {pageTitle[pathname] ?? 'Dashboard'}
            </h1>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/50 sm:block">
            JH Interior · Admin
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* ── Unsaved changes modal ── */}
      {pendingAction && (
        <UnsavedModal onLeave={confirmLeave} onStay={cancelLeave} />
      )}
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <UnsavedChangesProvider>
      <DashboardInner />
    </UnsavedChangesProvider>
  );
}
