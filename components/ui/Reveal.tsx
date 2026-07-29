"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: Math.max(y, 72),
              filter: "blur(7px)",
              clipPath: "inset(0 0 28% 0)",
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              clipPath: "inset(0 0 0% 0)",
            }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.95, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
