import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-amber-400/15 bg-black/90 px-6 py-10 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-lg font-semibold text-white">JH Interior</p>
          <p className="text-white/40">Premium interiors, crafted as an always-on service.</p>
          <SocialLinks className="mt-3" />
        </div>
        <div className="flex items-center gap-6">
          <a className="transition hover:text-white" href="#portfolio">
            Portfolio
          </a>
          <a className="transition hover:text-white" href="#services">
            Services
          </a>
          <a className="transition hover:text-white" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </footer>
  );
}
