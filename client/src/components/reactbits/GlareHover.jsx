import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function GlareHover({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [active, setActive] = useState(false);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const posX = (event.clientX - rect.left) / rect.width;
    const posY = (event.clientY - rect.top) / rect.height;
    x.set(posX);
    y.set(posY);
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative [perspective:1200px] ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        animate={{ scale: active ? 1.02 : 1, transition: { duration: 0.2 } }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.24),transparent_45%)]"
          style={{
            '--x': useTransform(x, (v) => `${v * 100}%`),
            '--y': useTransform(y, (v) => `${v * 100}%`),
            opacity: active ? 1 : 0,
          }}
        />
        <div className="relative">{children}</div>
      </motion.div>
    </motion.div>
  );
}
