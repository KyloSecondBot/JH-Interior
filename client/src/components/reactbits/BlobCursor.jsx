import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function BlobCursor() {
  const [isActive, setIsActive] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 15, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15, mass: 0.4 });

  useEffect(() => {
    const move = (event) => {
      mouseX.set(event.clientX - 80);
      mouseY.set(event.clientY - 80);
    };
    const down = () => setIsActive(true);
    const up = () => setIsActive(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] h-40 w-40 rounded-full opacity-70 blur-2xl"
      style={{ translateX: springX, translateY: springY, willChange: 'transform' }}
      animate={{
        scale: isActive ? 0.8 : 1,
        background: isActive
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(14,165,233,0.45), rgba(249,115,22,0.35))'
          : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(59,130,246,0.35), rgba(255,255,255,0.12))',
      }}
      transition={{ type: 'spring', stiffness: 160, damping: 18 }}
    />
  );
}
