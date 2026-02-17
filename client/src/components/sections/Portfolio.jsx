import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import GlareHover from "../reactbits/GlareHover.jsx";
import AnimatedGradientText from "../reactbits/AnimatedGradientText.jsx";
import CountUp from "../reactbits/CountUp.jsx";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const spotlights = [
  {
    title: "Halo Suites",
    location: "Seoul / Boutique Hospitality",
    palette: "from-slate-900 via-indigo-900/60 to-black",
    accent: "bg-amber-300/80",
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
    palette: "from-amber-900/60 via-slate-900 to-black",
    accent: "bg-cyan-300/80",
    summary: "Molten brass detailing, kinetic textiles, and ambient sound that adapts to guest density.",
    metricLabel: "Membership growth",
    metricValue: 54,
    metricSuffix: "%",
    tags: ["Adaptive acoustics", "Perfume map", "Live art feed"],
  },
  {
    title: "Cove Duplex",
    location: "TriBeCa / Residential",
    palette: "from-slate-800 via-slate-700 to-slate-900",
    accent: "bg-emerald-400/70",
    summary: "Stone planes, hidden light seams, and sculpted millwork for a cinematic two-level loft.",
    metricLabel: "Install timeline",
    metricValue: 9,
    metricSuffix: " wks",
    tags: ["Custom millwork", "Light seams", "Layered textiles"],
  },
];

const gallery = [
  { title: "Drift Spa", tone: "from-slate-950 via-cyan-950/50 to-slate-900", caption: "Vapor glass + ripple light" },
  { title: "Quiet Offices", tone: "from-slate-800 via-slate-900 to-slate-950", caption: "Acoustic focus suites" },
  { title: "Lumen Residences", tone: "from-slate-900 via-slate-800 to-slate-950", caption: "Soft metallic gradients" },
  { title: "Halo Lobby", tone: "from-indigo-900/60 via-slate-900 to-black", caption: "Arrival choreography" },
  { title: "Skyline Penthouse", tone: "from-slate-900 via-emerald-900/40 to-black", caption: "Mirror void gallery" },
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
                "radial-gradient(circle at 20% 30%, rgba(94,234,212,0.18), transparent 40%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.14), transparent 38%), radial-gradient(circle at 60% 75%, rgba(56,189,248,0.14), transparent 42%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr]" id="portfolio-product">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Portfolio / Product</p>
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
                    <p className="text-sm font-semibold text-emerald-100/80">Product chassis</p>
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
                        <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">{mod.title}</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Signature Cases</p>
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
                  <div
                    className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${project.palette} px-5 py-6`}
                  >
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 32%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.12), transparent 38%)",
                      }}
                    />
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
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-emerald-100/90">
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
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Gallery Rail</p>
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
              <div
                className={`h-28 rounded-3xl border border-white/10 bg-gradient-to-br ${item.tone} p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <span className="h-1.5 w-8 rounded-full bg-white/40" />
                </div>
                <p className="mt-2 text-xs text-slate-200/80">{item.caption}</p>
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
                ? "w-5 h-1.5 bg-emerald-400"
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
      <p className="text-xs uppercase tracking-[0.25em] text-emerald-100/70">{label}</p>
      <p className="mt-2 text-3xl font-semibold">
        <CountUp to={value} duration={1.4} />
        {suffix ? <span className="text-emerald-200/80">{suffix}</span> : null}
      </p>
    </div>
  );
}
