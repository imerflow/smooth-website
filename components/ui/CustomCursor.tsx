"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const smoothX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.15 });
  const smoothY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.15 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='active']")));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
    };
  }, [x, y]);

  return (
    <motion.div
      className="custom-cursor"
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: active ? 1.8 : 1, opacity: active ? 0.55 : 0.82 }}
      transition={{ duration: 0.2 }}
    />
  );
}
