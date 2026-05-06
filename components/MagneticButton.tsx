"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
};

export default function MagneticButton({
  href,
  className,
  children,
  strength = 0.4,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 250, mass: 0.5 });
  const sy = useSpring(y, { damping: 18, stiffness: 250, mass: 0.5 });
  const innerX = useTransform(sx, (v) => v * 0.5);
  const innerY = useTransform(sy, (v) => v * 0.5);
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      <motion.span
        style={{ x: innerX, y: innerY, display: "inline-block" }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
