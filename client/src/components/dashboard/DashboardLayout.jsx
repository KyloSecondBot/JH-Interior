import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const pageTitle = {
  '/dashboard':              'Overview',
  '/dashboard/portfolio':    'Portfolio',
  '/dashboard/workstack':    'Work Stack',
  '/dashboard/testimonials': 'Testimonials',
  '/dashboard/stats':        'Stats',
  '/dashboard/contact':      'Contact',
};

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <DashboardSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
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

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
