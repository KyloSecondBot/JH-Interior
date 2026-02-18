import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const CardNav = ({ logo, logoAlt = 'Logo', items = [], ease = 'power3.out' }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const prev = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight;
        const total = 60 + contentEl.scrollHeight + 16;
        Object.assign(contentEl.style, prev);
        return total;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const tl = createTimeline();
        if (tl) { tl.progress(1); tlRef.current = tl; }
      } else {
        tlRef.current.kill();
        const tl = createTimeline();
        if (tl) tlRef.current = tl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => { if (el) cardsRef.current[i] = el; };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-40 top-4 md:top-5">
      <nav
        ref={navRef}
        className="block h-[60px] p-0 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden will-change-[height] backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(11,18,32,0.92)' }}
      >
        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-[2]">
          {/* Hamburger */}
          <button
            className="group flex flex-col items-center justify-center gap-[5px] h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 order-2 md:order-none shrink-0"
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-250 origin-center ${
                isHamburgerOpen ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 origin-center ${
                isHamburgerOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-250 origin-center ${
                isHamburgerOpen ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>

          {/* Logo — centered on desktop */}
          <a
            href="#"
            aria-label="JH Interior home"
            className="order-1 md:order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            onClick={() => { if (isExpanded) toggleMenu(); }}
          >
            <img
              src={logo}
              alt={logoAlt}
              className="h-10 w-10 rounded-xl object-cover shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition hover:scale-105"
            />
          </a>

          {/* CTA — desktop only */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full bg-white px-4 py-2 text-slate-950 text-sm font-semibold shadow-[0_6px_24px_rgba(255,255,255,0.1)] transition hover:-translate-y-[1px]"
            onClick={() => { if (isExpanded) toggleMenu(); }}
          >
            Book a Call
          </a>
        </div>

        {/* Card panels */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col gap-2 z-[1] md:flex-row md:gap-3 ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="relative flex flex-col gap-2 p-4 rounded-xl min-h-[60px] flex-1 border border-white/8"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <p className="font-medium tracking-tight text-lg md:text-xl text-white/60">
                {item.label}
              </p>
              <div className="mt-auto flex flex-col gap-1">
                {item.links?.map((lnk) => (
                  <a
                    key={lnk.label}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={toggleMenu}
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white/90 no-underline transition-opacity hover:opacity-70"
                  >
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Mobile-only: Book a Call full-width */}
          <a
            href="#contact"
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center rounded-xl bg-white py-3 text-slate-950 text-sm font-semibold shadow-[0_6px_24px_rgba(255,255,255,0.1)] transition hover:opacity-90"
          >
            Book a Call
          </a>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
