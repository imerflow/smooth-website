"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className: string;
  id: string;
}) {
  const reduceMotion = useReducedMotion();
  const horizontal =
    id === "challenge" ? -72 : id === "evidence-status" ? 72 : 0;

  return (
    <motion.section
      className={className}
      id={id}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 86,
              x: horizontal,
              filter: "blur(7px)",
              clipPath: "inset(0 0 16% 0)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0)",
      }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
