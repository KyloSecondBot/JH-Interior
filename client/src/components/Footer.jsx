import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-10 text-sm text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-lg font-semibold text-white">JH Interior</p>
          <p className="text-slate-400">Premium interiors, crafted as an always-on service.</p>
          <SocialLinks className="mt-3" />
        </div>
        <div className="flex items-center gap-6">
          <a className="transition hover:text-white" href="#portfolio">
            Portfolio
          </a>
          <a className="transition hover:text-white" href="#services">
            Services
          </a>
          <a className="transition hover:text-white" href="#cta">
            Get in touch
          </a>
        </div>
      </div>
    </footer>
  );
}
