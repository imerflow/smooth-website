"use client";

import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { siteMeta } from "@/data/cas-content";

const ease = [0.16, 1, 0.3, 1] as const;

function MaskedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <motion.span
      className="masked-word"
      aria-label={word}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: 0.035 } },
      }}
    >
      {Array.from(word).map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          variants={{
            hidden: { y: "112%" },
            visible: {
              y: 0,
              transition: { duration: 0.82, ease },
            },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const { scrollY, scrollYProgress } = useScroll();
  const drift = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 64]);
  const opacity = useTransform(scrollY, [0, 760], [1, 0.2]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    pointerX.set(x * 18);
    pointerY.set(y * 12);
  };

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="intro-curtain"
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.82, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.72, times: [0, 0.2, 0.72, 1] }}
        >
          CAS / 2025—2027
        </motion.p>
      </motion.div>

      <motion.div
        className="global-progress"
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="hero-meta">
        <p>
          {siteMeta.title}
          <br />
          {siteMeta.programme}
        </p>
        <p>
          {siteMeta.location}
          <br />
          Updated portfolio
        </p>
      </div>

      <motion.div
        className="hero-type"
        style={{ x: smoothX, y: reduceMotion ? 0 : smoothY }}
      >
        <p className="eyebrow">Learning through documented experience</p>
        <motion.h1 id="hero-title" style={{ y: drift, opacity }}>
          <span>
            <MaskedWord word="Iker" delay={0.38} />
          </span>
          <span className="outline">
            <MaskedWord word="López" delay={0.5} />
          </span>
        </motion.h1>
      </motion.div>

      <div className="hero-bottom">
        <p>{siteMeta.intro}</p>
        <a href="#about" className="scroll-indicator">
          <span aria-hidden="true">↓</span>
          Explore the record
        </a>
        <p>Service / Creativity / Activity</p>
      </div>
    </section>
  );
}
