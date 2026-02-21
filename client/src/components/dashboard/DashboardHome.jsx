import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, Layers, Quote, BarChart2, MapPin, ArrowRight, Briefcase, ListOrdered } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const cards = [
  { label: 'Portfolio Projects', icon: Image,        href: '/dashboard/portfolio',    table: 'portfolio_projects' },
  { label: 'Work Stack',         icon: Layers,       href: '/dashboard/workstack',    table: 'workstack_projects' },
  { label: 'Services',           icon: Briefcase,    href: '/dashboard/services',     table: 'services' },
  { label: 'Process Steps',      icon: ListOrdered,  href: '/dashboard/process',      table: 'process_steps' },
  { label: 'Testimonials',       icon: Quote,        href: '/dashboard/testimonials', table: 'testimonials' },
  { label: 'Stats',              icon: BarChart2,    href: '/dashboard/stats',        table: 'studio_stats' },
];

function StatCard({ label, icon: Icon, href, table, delay }) {
  const [count, setCount] = useState('—');

  useEffect(() => {
    supabase
      .from(table)
      .select('id', { count: 'exact', head: true })
      .then(({ count: c }) => setCount(c ?? 0));
  }, [table]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        to={href}
        className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 p-5 transition hover:border-white/15 hover:bg-white/5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5">
            <Icon className="h-5 w-5 text-amber-400/80" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">{label}</p>
            <p className="mt-0.5 text-2xl font-semibold text-white">{count}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/50" />
      </Link>
    </motion.div>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-2xl font-semibold text-white">Good to see you.</h2>
        <p className="mt-1 text-sm text-white/40">
          Manage all site content from here. Changes reflect on the homepage instantly.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, i) => (
          <StatCard key={card.table} {...card} delay={0.06 + i * 0.05} />
        ))}
      </div>

      {/* Contact quick link */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32 }}
      >
        <Link
          to="/dashboard/contact"
          className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 transition hover:border-white/15 hover:bg-white/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5">
            <MapPin className="h-5 w-5 text-amber-400/80" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">Contact Info</p>
            <p className="mt-0.5 text-sm text-white/60">Address · Email · Phone · WhatsApp · Map embed</p>
          </div>
          <ArrowRight className="h-4 w-4 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/50" />
        </Link>
      </motion.div>
    </div>
  );
}
