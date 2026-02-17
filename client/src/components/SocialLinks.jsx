const InstagramIcon = ({ className = 'h-5 w-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17" cy="7" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.5 9.5a7.4 7.4 0 0 1-4.2-1.3v6.13a5.5 5.5 0 1 1-5.5-5.5c.2 0 .4 0 .6.02v2.36c-.17-.05-.35-.08-.54-.08a2.5 2.5 0 1 0 2.5 2.5V3h3.4c.26 1.93 1.66 3.5 3.34 3.98v2.52Z" />
  </svg>
);

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href="https://www.instagram.com/accounts/login/?next=%2Fjhinterior.id%2F&source=omni_redirect"
        target="_blank"
        rel="noreferrer"
        aria-label="JHInterior on Instagram"
        className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:-translate-y-[1px] hover:border-emerald-300/60 hover:text-emerald-200"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://www.tiktok.com/@jhinterior.id"
        target="_blank"
        rel="noreferrer"
        aria-label="JHInterior on TikTok"
        className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:-translate-y-[1px] hover:border-emerald-300/60 hover:text-emerald-200"
      >
        <TikTokIcon />
      </a>
    </div>
  );
}
