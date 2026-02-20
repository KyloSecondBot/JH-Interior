import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Image, Layers, Quote, BarChart2, MapPin,
  ArrowLeft, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { label: 'Overview',     href: '/dashboard',              icon: LayoutDashboard, end: true },
  { label: 'Portfolio',    href: '/dashboard/portfolio',    icon: Image },
  { label: 'Work Stack',   href: '/dashboard/workstack',    icon: Layers },
  { label: 'Testimonials', href: '/dashboard/testimonials', icon: Quote },
  { label: 'Stats',        href: '/dashboard/stats',        icon: BarChart2 },
  { label: 'Contact',      href: '/dashboard/contact',      icon: MapPin },
];

function NavItem({ href, icon: Icon, label, end }) {
  return (
    <NavLink
      to={href}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
         ${isActive
           ? 'bg-amber-400/10 text-amber-300'
           : 'text-white/45 hover:bg-white/5 hover:text-white/80'}`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  );
}

export default function DashboardSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/8 bg-black/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-5 py-6">
        <span className="text-base font-semibold tracking-tight text-white">JH Interior</span>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/60">Admin</p>
      </div>

      <div className="h-px bg-white/8" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {nav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      <div className="h-px bg-white/8" />

      {/* Footer actions */}
      <div className="px-3 py-4 space-y-0.5">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/45 transition hover:bg-white/5 hover:text-white/80"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to site
        </NavLink>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/45 transition hover:bg-white/5 hover:text-white/80"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
