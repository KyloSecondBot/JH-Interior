import { useEffect, useState } from 'react';
import { animate, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';

export default function CountUp({ from = 0, to = 100, duration = 2, className = '' }) {
  const value = useMotionValue(from);
  const rounded = useTransform(value, (latest) => Math.round(latest).toLocaleString());
  const [display, setDisplay] = useState(rounded.get());

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => value.set(v),
    });
    return () => controls.stop();
  }, [from, to, duration, value]);

  useMotionValueEvent(rounded, 'change', (v) => setDisplay(v));

  return <span className={className}>{display}</span>;
}
