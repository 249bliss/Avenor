'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

export default function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 2.5,
  delay = 0,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        delay: delay,
        ease: [0.33, 1, 0.68, 1], // Luxury easing curve
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, delay, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{decimals > 0 ? '.' + '0'.repeat(decimals) : ''}{suffix}
    </span>
  );
}
