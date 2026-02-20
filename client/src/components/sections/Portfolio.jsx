import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlareHover from "../reactbits/GlareHover.jsx";
import AnimatedGradientText from "../reactbits/AnimatedGradientText.jsx";
import CountUp from "../reactbits/CountUp.jsx";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { usePortfolio } from "../../hooks/usePortfolio.js";

import img11 from "../../assets/1.1.webp";
import img12 from "../../assets/1.2.webp";
import img21 from "../../assets/2.1.webp";
import img22 from "../../assets/2.2.webp";
import img23 from "../../assets/2.3.webp";
import img24 from "../../assets/2.4.webp";
import img26 from "../../assets/2.6.webp";
import img27 from "../../assets/2.7.webp";
import img28 from "../../assets/2.8.webp";

const FALLBACK_SPOTLIGHTS = [
  {
    id: 'f1', title: "Halo Suites", location: "Seoul / Boutique Hospitality",
    overlay_gradient: "from-indigo-950/80 via-slate-900/75 to-black/90", accent_color: "bg-white/55",
    image_url: img21,
    summary: "Signature suites with luminous arches, gallery-grade art rotations, and choreographed lighting scenes.",
    metric_label: "ADR lift", metric_value: "38%",
    portfolio_tags: [{ tag: "Motion lighting" }, { tag: "Gallery curation" }, { tag: "Concierge scripting" }],
  },
  {
    id: 'f2', title: "Sands Members Club", location: "Dubai / Private Lounge",
    overlay_gradient: "from-black/80 via-black/60 to-black/90", accent_color: "bg-white/55",
    image_url: img11,
    summary: "Molten brass detailing, kinetic textiles, and ambient sound that adapts to guest density.",
    metric_label: "Membership growth", metric_value: "54%",
    portfolio_tags: [{ tag: "Adaptive acoustics" }, { tag: "Perfume map" }, { tag: "Live art feed" }],
  },
  {
    id: 'f3', title: "Cove Duplex", location: "TriBeCa / Residential",
    overlay_gradient: "from-black/80 via-black/60 to-black/90", accent_color: "bg-white/55",
    image_url: img12,
    summary: "Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft.",
    metric_label: "Install timeline", metric_value: "9 wks",
    portfolio_tags: [{ tag: "Custom millwork" }, { tag: "Light seams" }, { tag: "Layered textiles" }],
  },
];

const FALLBACK_GALLERY = [
  { id: 'g1', title: "Drift Spa",         tone_gradient: "from-black/60 via-black/35 to-black/70",          caption: "Vapor glass + ripple light", image_url: img22 },
  { id: 'g2', title: "Quiet Offices",     tone_gradient: "from-black/55 via-black/40 to-black/70",          caption: "Acoustic focus suites",      image_url: img23 },
  { id: 'g3', title: "Lumen Residences",  tone_gradient: "from-black/58 via-black/42 to-black/72",          caption: "Soft metallic gradients",    image_url: img24 },
  { id: 'g4', title: "Halo Lobby",        tone_gradient: "from-indigo-900/60 via-slate-900/50 to-black/70", caption: "Arrival choreography",       image_url: img26 },
  { id: 'g5', title: "Skyline Penthouse", tone_gradient: "from-black/55 via-black/35 to-black/70",          caption: "Mirror void gallery",        image_url: img27 },
  { id: 'g6', title: "The Residences",    tone_gradient: "from-black/60 via-black/45 to-black/70",          caption: "Full-floor living",          image_url: img28 },
];

const modules = [
  { title: "Motion-first visualization", desc: "Animated proofs for every space before fabrication begins." },
  { title: "Procurement cloud", desc: "Live sourcing, budget bands, and vendor orchestration in one dashboard." },
  { title: "Installation choreography", desc: "Sequenced on-site scripts for lighting, scent, art, and styling." },
];

export default function Portfolio() {
  const { projects: liveProjects, gallery: liveGallery, loading } = usePortfolio();
  const spotlights = !loading && liveProjects.length > 0 ? liveProjects : FALLBACK_SPOTLIGHTS;
  const galleryItems = !loading && liveGallery.length > 0 ? liveGallery : FALLBACK_GALLERY;

  return (
    <section id="portfolio" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:px-10">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.08), transparent 38%), radial-gradient(circle at 60% 75%, rgba(251,191,36,0.06), transparent 42%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr]" id="portfolio-product">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Portfolio / Product</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">A cinematic product pipeline for interiors.</h2>
              <p className="max-w-2xl text-white/75">
                Every space ships like software: motion prototypes, fabrication packs, procurement cloud, and on-site
                choreography. We own the full stack from visualization to white-glove install.
              </p>
              <AnimatedGradientText className="text-sm font-semibold">
                Live dashboards / Remote ready / Global install partners
              </AnimatedGradientText>
            </div>
            <GlareHover>
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 px-6 py-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-amber-300/75">Product chassis</p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">24/7 Studio</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Metric label="Projects live" value={36} />
                    <Metric label="Cities served" value={12} />
                    <Metric label="Avg uplift" value={42} suffix="%" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {modules.map((mod) => (
                      <div key={mod.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">{mod.title}</p>
                        <p className="mt-1 text-sm text-white/80">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlareHover>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Signature Cases</p>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Where the product lives.</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {spotlights.map((project, idx) => {
              const tags = project.portfolio_tags?.map((t) => t.tag) ?? [];
              // Parse numeric value from metric_value string (e.g. "38%" → 38)
              const numericValue = parseFloat(project.metric_value) || 0;
              const suffix = project.metric_value?.replace(/[\d.]/g, '') ?? '';
              // Fallback cards use ids starting with 'f' — don't link those
              const isLive = !String(project.id).startsWith('f');
              const card = (
                <GlareHover>
                  <div className={`relative overflow-hidden rounded-3xl border border-white/10 px-5 py-6${isLive ? ' cursor-pointer' : ''}`}>
                    {/* Project photo */}
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.overlay_gradient}`} />
                    <div className="relative flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                          {project.location}
                        </span>
                        <span className={`h-2 w-10 rounded-full ${project.accent_color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="text-sm text-white/75">{project.summary}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-amber-300/80">
                          {project.metric_label}
                        </span>
                        <span className="text-lg">
                          {numericValue > 0 ? (
                            <><CountUp to={numericValue} duration={1.4} />{suffix}</>
                          ) : (
                            project.metric_value
                          )}
                        </span>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs text-white/75">
                          {tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {isLive && (
                        <span className="mt-1 self-start rounded-full border border-amber-400/25 bg-amber-400/8 px-3 py-1 text-xs font-semibold text-amber-300/80">
                          View Project →
                        </span>
                      )}
                    </div>
                  </div>
                </GlareHover>
              );
              return (
                <motion.div
                  key={project.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.55, delay: idx * 0.06 }}
                >
                  {isLive ? (
                    <Link to={`/work/${project.id}`} className="block">
                      {card}
                    </Link>
                  ) : card}
                </motion.div>
              );
            })}
          </div>
        </div>

        <GalleryCarousel items={galleryItems} />
      </div>
    </section>
  );
}

function GalleryCarousel({ items = [] }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!api) return;
    const timer = setInterval(() => api.scrollNext(), 3200);
    return () => clearInterval(timer);
  }, [api]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Gallery Rail</p>
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">Motion proofs and material studies.</h3>
        </div>
        <AnimatedGradientText className="hidden text-sm font-semibold sm:block">
          Swipe through live studies
        </AnimatedGradientText>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((item) => (
            <CarouselItem key={item.id ?? item.title} className="pl-3 basis-[75%] sm:basis-[42%] lg:basis-[28%]">
              <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.tone_gradient}`} />
                <div className="relative flex h-full flex-col justify-end p-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs text-white/65">{item.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-amber-400"
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Metric({ label, value, suffix }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
      <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70">{label}</p>
      <p className="mt-2 text-3xl font-semibold">
        <CountUp to={value} duration={1.4} />
        {suffix ? <span className="text-amber-300/75">{suffix}</span> : null}
      </p>
    </div>
  );
}
