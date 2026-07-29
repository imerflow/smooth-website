"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const sections = [
  ["01", "Summary", "summary"],
  ["02", "Challenge", "challenge"],
  ["04", "Outcomes", "outcomes"],
  ["05", "Evidence", "media"],
  ["06", "Status", "evidence-status"],
] as const;

export function ExperienceProgress() {
  const [active, setActive] = useState("summary");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const nodes = sections
      .map(([, , id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    sections.findIndex(([, , id]) => id === active),
  );

  return (
    <aside className="experience-progress" aria-label="Reading progress">
      <p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {sections[activeIndex][0]} {sections[activeIndex][1]}
          </motion.span>
        </AnimatePresence>
      </p>
      <div aria-hidden="true">
        <motion.i style={{ scaleY: reduceMotion ? 1 : progress }} />
      </div>
      <p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(sections.length).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </p>
    </aside>
  );
}
