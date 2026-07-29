"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
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
      setVisible(true);
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      const nativeControl = target?.closest("input, select, textarea, video");
      setActive(Boolean(interactive) && !nativeControl);
      setLabel(nativeControl ? "" : interactive?.dataset.cursor || "");
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className={`custom-cursor${label ? " has-label" : ""}`}
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        scale: active ? 1.12 : 1,
        opacity: visible ? (active ? 0.96 : 0.74) : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {label && <span>{label}</span>}
    </motion.div>
  );
}
