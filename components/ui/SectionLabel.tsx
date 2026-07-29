"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionLabel({
  number,
  title,
  meta,
  dark = false,
}: {
  number: string;
  title: string;
  meta: string;
  dark?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`section-label${dark ? " section-label-dark" : ""}`}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        duration: reduceMotion ? 0.18 : 0.78,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <p>
        <span>{number}</span>
        {title}
      </p>
      <p>{meta}</p>
      <motion.i
        aria-hidden="true"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          duration: reduceMotion ? 0 : 1,
          delay: 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.div>
  );
}
