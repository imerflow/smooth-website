"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      className={`section-label${dark ? " section-label-dark" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <p>
        <span>{number}</span>
        {title}
      </p>
      <p>{meta}</p>
    </motion.div>
  );
}
