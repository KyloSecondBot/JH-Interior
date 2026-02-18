import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import GlareHover from "../reactbits/GlareHover.jsx";
import AnimatedGradientText from "../reactbits/AnimatedGradientText.jsx";
import CountUp from "../reactbits/CountUp.jsx";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import img11 from "../../assets/1.1.webp";
import img12 from "../../assets/1.2.webp";
import img21 from "../../assets/2.1.webp";
import img22 from "../../assets/2.2.webp";
import img23 from "../../assets/2.3.webp";
import img24 from "../../assets/2.4.webp";
import img26 from "../../assets/2.6.webp";
import img27 from "../../assets/2.7.webp";
import img28 from "../../assets/2.8.webp";

const spotlights = [
  {
    title: "Halo Suites",
    location: "Seoul / Boutique Hospitality",
    overlay: "from-indigo-950/80 via-slate-900/75 to-black/90",
    accent: "bg-white/55",
    img: img21,
    summary:
      "Signature suites with luminous arches, gallery-grade art rotations, and choreographed lighting scenes.",
    metricLabel: "ADR lift",
    metricValue: 38,
    metricSuffix: "%",
    tags: ["Motion lighting", "Gallery curation", "Concierge scripting"],
  },
  {
    title: "Sands Members Club",
    location: "Dubai / Private Lounge",
    overlay: "from-slate-900/80 via-slate-800/75 to-black/90",
    accent: "bg-white/55",
    img: img11,
    summary: "Molten brass detailing, kinetic textiles, and ambient sound that adapts to guest density.",
    metricLabel: "Membership growth",
    metricValue: 54,
    metricSuffix: "%",
    tags: ["Adaptive acoustics", "Perfume map", "Live art feed"],
  },
  {
    title: "Cove Duplex",
    location: "TriBeCa / Residential",
    overlay: "from-slate-900/80 via-slate-800/75 to-black/90",
    accent: "bg-white/55",
    img: img12,
    summary: "Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft.",
    metricLabel: "Install timeline",
    metricValue: 9,
    metricSuffix: " wks",
    tags: ["Custom millwork", "Light seams", "Layered textiles"],
  },
];

const gallery = [
  { title: "Drift Spa", tone: "from-slate-950/60 via-cyan-950/40 to-slate-900/70", caption: "Vapor glass + ripple light", img: img22 },
  { title: "Quiet Offices", tone: "from-slate-800/60 via-slate-900/50 to-slate-950/70", caption: "Acoustic focus suites", img: img23 },
  { title: "Lumen Residences", tone: "from-slate-900/60 via-slate-800/50 to-slate-950/70", caption: "Soft metallic gradients", img: img24 },
  { title: "Halo Lobby", tone: "from-indigo-900/60 via-slate-900/50 to-black/70", caption: "Arrival choreography", img: img26 },
  { title: "Skyline Penthouse", tone: "from-slate-900/60 via-slate-800/40 to-black/70", caption: "Mirror void gallery", img: img27 },
  { title: "The Residences", tone: "from-slate-950/60 via-slate-800/50 to-slate-900/70", caption: "Full-floor living", img: img28 },
];

const modules = [
  { title: "Motion-first visualization", desc: "Animated proofs for every space before fabrication begins." },
  { title: "Procurement cloud", desc: "Live sourcing, budget bands, and vendor orchestration in one dashboard." },
  { title: "Installation choreography", desc: "Sequenced on-site scripts for lighting, scent, art, and styling." },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:px-10">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05), transparent 38%), radial-gradient(circle at 60% 75%, rgba(255,255,255,0.06), transparent 42%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr]" id="portfolio-product">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Portfolio / Product</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">A cinematic product pipeline for interiors.</h2>
              <p className="max-w-2xl text-slate-200/80">
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
                    <p className="text-sm font-semibold text-white/60">Product chassis</p>
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
                        <p className="text-xs uppercase tracking-[0.2em] text-white/50">{mod.title}</p>
                        <p className="mt-1 text-sm text-slate-200/85">{mod.desc}</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Signature Cases</p>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Where the product lives.</h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {spotlights.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
              >
                <GlareHover>
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 px-5 py-6">
                    {/* Real project photo */}
                    <img
                      src={project.img}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.overlay}`} />
                    <div className="relative flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                          {project.location}
                        </span>
                        <span className={`h-2 w-10 rounded-full ${project.accent}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="text-sm text-slate-200/80">{project.summary}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">
                          {project.metricLabel}
                        </span>
                        <span className="text-lg">
                          <CountUp to={project.metricValue} duration={1.4} />
                          {project.metricSuffix}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-100/80">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlareHover>
              </motion.div>
            ))}
          </div>
        </div>

        <GalleryCarousel />
      </div>
    </section>
  );
}

function GalleryCarousel() {
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
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Gallery Rail</p>
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
          {gallery.map((item) => (
            <CarouselItem key={item.title} className="pl-3 basis-[75%] sm:basis-[42%] lg:basis-[28%]">
              <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
                <div className="relative flex h-full flex-col justify-end p-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs text-slate-200/75">{item.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {gallery.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-white"
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
      <p className="text-xs uppercase tracking-[0.25em] text-white/50">{label}</p>
      <p className="mt-2 text-3xl font-semibold">
        <CountUp to={value} duration={1.4} />
        {suffix ? <span className="text-white/60">{suffix}</span> : null}
      </p>
    </div>
  );
}
