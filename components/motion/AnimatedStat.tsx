"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

export function AnimatedStat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = Number(match?.[1] || 0);
  const suffix = match?.[2] || "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const number = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(number, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      number.set(target);
      return;
    }

    const controls = animate(number, target, {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, number, reduceMotion, target]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}
