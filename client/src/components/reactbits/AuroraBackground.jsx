import { motion } from 'framer-motion';

const blobs = [
  { color: 'from-amber-500/25 via-orange-500/15 to-transparent', size: 'h-[420px] w-[420px]', x: 12, y: 8 },
  { color: 'from-cyan-500/25 via-teal-400/15 to-transparent', size: 'h-[520px] w-[520px]', x: 60, y: 12 },
  { color: 'from-fuchsia-500/20 via-pink-500/12 to-transparent', size: 'h-[380px] w-[380px]', x: 32, y: 60 },
];

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/70" />
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 25%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.06), transparent 22%), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.07), transparent 25%)' }} />

      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} rounded-full bg-gradient-to-br ${blob.color} blur-3xl`}
          style={{ left: `${blob.x}%`, top: `${blob.y}%`, willChange: 'transform' }}
          animate={{ x: ['-6%', '6%', '-6%'], y: ['-4%', '8%', '-4%'], rotate: [0, 12, -8, 0] }}
          transition={{ duration: 18 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_55%)] mix-blend-screen" />
    </div>
  );
}
