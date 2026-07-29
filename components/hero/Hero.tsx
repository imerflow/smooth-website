"use client";

import type { PointerEvent } from "react";
import { useSyncExternalStore } from "react";
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

function subscribeToMobile(onStoreChange: () => void) {
  const media = window.matchMedia("(max-width: 700px)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 700px)").matches;
}

function MaskedWord({ word, delay }: { word: string; delay: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="masked-word"
      aria-label={word}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: reduceMotion
          ? { opacity: 0 }
          : { letterSpacing: "-0.025em" },
        visible: {
          opacity: 1,
          letterSpacing: "-0.082em",
          transition: {
            delayChildren: reduceMotion ? 0 : delay,
            staggerChildren: reduceMotion ? 0 : 0.055,
            letterSpacing: { duration: 1.1, ease },
          },
        },
      }}
    >
      {Array.from(word).map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          variants={{
            hidden: reduceMotion ? { opacity: 0 } : { y: 135 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: reduceMotion ? 0.18 : 1.05, ease },
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
  const mobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    () => false,
  );
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const { scrollY, scrollYProgress } = useScroll();
  const drift = useTransform(
    scrollY,
    [0, 900],
    [0, reduceMotion ? 0 : mobile ? 18 : 92],
  );
  const opacity = useTransform(scrollY, [0, 780], [1, 0.16]);
  const heroScale = useTransform(
    scrollY,
    [0, 780],
    [1, reduceMotion ? 1 : 0.91],
  );
  const ikerX = useTransform(
    scrollY,
    [0, 780],
    [0, reduceMotion ? 0 : mobile ? -18 : -110],
  );
  const lopezX = useTransform(
    scrollY,
    [0, 780],
    [0, reduceMotion ? 0 : mobile ? 22 : 138],
  );
  const lopezScaleX = useTransform(
    scrollY,
    [0, 260, 780],
    reduceMotion ? [1, 1, 1] : [1.13, 1, 1.08],
  );
  const ghostY = useTransform(
    scrollY,
    [0, 800],
    [0, reduceMotion ? 0 : -150],
  );

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
        <motion.span
          className="hero-ghost"
          aria-hidden="true"
          style={{ y: ghostY }}
        >
          CAS
        </motion.span>
        <p className="eyebrow">Learning through documented experience</p>
        <motion.h1
          id="hero-title"
          style={{ y: drift, opacity, scale: heroScale }}
        >
          <motion.span style={{ x: ikerX }}>
            <MaskedWord word="Iker" delay={0.38} />
          </motion.span>
          <motion.span
            className="outline"
            style={{ x: lopezX, scaleX: lopezScaleX }}
          >
            <MaskedWord word="López" delay={0.56} />
          </motion.span>
        </motion.h1>
      </motion.div>

      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05, ease }}
      >
        <motion.i
          className="hero-divider"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.15, delay: 0.82, ease }}
        />
        <p>{siteMeta.intro}</p>
        <a href="#about" className="scroll-indicator">
          <span aria-hidden="true">↓</span>
          Explore the record
        </a>
        <p>Service / Creativity / Activity</p>
      </motion.div>
    </section>
  );
}
