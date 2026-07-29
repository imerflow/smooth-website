"use client";

import { motion, useReducedMotion } from "framer-motion";

const phrase = "SERVICE / CREATIVITY / ACTIVITY / DOCUMENTED EXPERIENCE / ";

export function KineticType() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="kinetic-type" aria-label="Service, creativity, activity">
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        <span>{phrase.repeat(3)}</span>
        <span>{phrase.repeat(3)}</span>
      </motion.div>
    </section>
  );
}
