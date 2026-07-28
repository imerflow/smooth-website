"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const experiences = [
  {
    number: "01",
    title: "NASA Space Apps",
    strands: "Creativity",
    description:
      "A 24-hour collaborative challenge focused on innovation, systems thinking, and communication under pressure.",
    focus: "Collaboration / Innovation",
  },
  {
    number: "02",
    title: "Mountain Leadership",
    strands: "Service · Activity",
    description:
      "Guiding younger students through long routes while managing safety, motivation, and group dynamics.",
    focus: "Leadership / Responsibility",
  },
  {
    number: "03",
    title: "Gran Recapte",
    strands: "Service",
    description:
      "Supporting Catalonia’s food collection campaign through direct public engagement and teamwork.",
    focus: "Community / Teamwork",
  },
  {
    number: "04",
    title: "Boxing",
    strands: "Activity",
    description:
      "Developing discipline, resilience, technical skill, and consistency through long-term training.",
    focus: "Discipline / Resilience",
  },
] as const;

const menuItems = [
  ["About", "#about"],
  ["Experiences", "#experiences"],
  ["Reflections", "#reflection"],
  ["Evidence", "#evidence"],
  ["Contact", "#contact"],
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.09 } },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });
  const heroDrift = useTransform(
    scrollY,
    [0, 850],
    [0, reduceMotion ? 0 : 72],
  );
  const heroFade = useTransform(scrollY, [0, 720], [1, 0.18]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMenuLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (
        event.key === "Tab" &&
        event.shiftKey &&
        document.activeElement === menuButtonRef.current
      ) {
        event.preventDefault();
        lastMenuLinkRef.current?.focus();
      } else if (
        event.key === "Tab" &&
        !event.shiftKey &&
        document.activeElement === lastMenuLinkRef.current
      ) {
        event.preventDefault();
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="site-shell" id="home">
        <motion.div
          className="scroll-progress"
          aria-hidden="true"
          style={{ scaleX: progress }}
        />
        <div className="grain" aria-hidden="true" />

        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <motion.header
          className={`site-header${menuOpen ? " site-header-open" : ""}`}
          initial={{ y: -72 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease }}
        >
          <nav className="nav-wrap" aria-label="Primary navigation">
            <a className="wordmark" href="#home" aria-label="Iker López, home">
              IKER LÓPEZ
            </a>

            <button
              className="menu-toggle"
              type="button"
              ref={menuButtonRef}
              aria-expanded={menuOpen}
              aria-controls="editorial-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "CLOSE" : "MENU"}{" "}
              <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
            </button>
          </nav>
        </motion.header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="menu-overlay"
              id="editorial-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease }}
            >
              <motion.nav
                className="overlay-nav"
                aria-label="Editorial navigation"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map(([label, href], index) => (
                  <motion.a
                    key={href}
                    href={href}
                    ref={
                      index === 0
                        ? firstMenuLinkRef
                        : index === menuItems.length - 1
                          ? lastMenuLinkRef
                          : undefined
                    }
                    onClick={() => setMenuOpen(false)}
                    variants={reveal}
                  >
                    <span>0{index + 1}</span>
                    <strong>{label}</strong>
                    <span aria-hidden="true">↘</span>
                  </motion.a>
                ))}
              </motion.nav>
              <motion.div
                className="overlay-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <p>IB Diploma Programme · CAS Portfolio</p>
                <p>Barcelona, Spain · 2025—2027</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-topline">
            <Reveal>
              <p>
                IB Creativity, Activity
                <br />
                &amp; Service Portfolio
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="align-right">
                Barcelona, Spain
                <br />
                2025—2027
              </p>
            </Reveal>
          </div>

          <motion.div
            className="hero-stage"
            id="main-content"
            style={{ y: heroDrift, opacity: heroFade }}
          >
            <motion.div
              className="hero-kicker"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
            >
              <span aria-hidden="true" />
              Learning through experience
            </motion.div>

            <h1 id="hero-title" className="hero-title">
              <span className="hero-line">
                <AnimatedText text="Iker" delay={0.42} />
              </span>
              <span className="hero-line hero-line-shift">
                <AnimatedText text="López" delay={0.56} />
              </span>
            </h1>

          </motion.div>

          <motion.div
            className="hero-foot"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="hero-intro" variants={reveal}>
              A considered record of what I create, the challenges I take on, and
              the communities I contribute to.
            </motion.p>
            <motion.div className="scroll-cue" variants={reveal}>
              <span className="scroll-cue-mark" aria-hidden="true">
                ↓
              </span>
              Scroll to discover
            </motion.div>
            <motion.p className="hero-strands" variants={reveal}>
              Creativity / Activity / Service
            </motion.p>
          </motion.div>
        </section>

        <section className="section about" id="about">
          <SectionHeader number="01" title="About" meta="The purpose" />

          <div className="about-grid">
            <Reveal className="about-lead">
              <p>
                CAS becomes meaningful when experiences are{" "}
                <span>examined,</span> not simply completed.
              </p>
            </Reveal>

            <motion.div
              className="about-copy"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.p variants={reveal}>
                This portfolio records what I did, what challenged me, the
                decisions I made, and how each experience contributed to my
                development.
              </motion.p>
              <motion.div className="stats" variants={reveal}>
                <Stat value="04" label="Experiences" />
                <Stat value="03" label="CAS strands" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section experiences" id="experiences">
          <SectionHeader
            number="02"
            title="Selected experiences"
            meta="2025—2027"
          />

          <div className="experiences-intro">
            <Reveal>
              <h2>
                Practice <span>in motion.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="experiences-note">
              <p>
                Four different contexts. One continuous process of showing up,
                adapting, and learning with intention.
              </p>
            </Reveal>
          </div>

          <span className="anchor-target" id="evidence" aria-hidden="true" />
          <motion.div
            className="experience-list"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            {experiences.map((experience) => (
              <ExperienceRow key={experience.number} experience={experience} />
            ))}
          </motion.div>
        </section>

        <section className="reflection" id="reflection">
          <div className="reflection-orbit" aria-hidden="true">
            <span>C</span>
            <span>A</span>
            <span>S</span>
          </div>

          <SectionHeader
            number="03"
            title="Reflection"
            meta="Looking inward"
            dark
          />

          <div className="reflection-grid">
            <Reveal className="reflection-title">
              <h2>
                The work
                <br />
                <span>continues.</span>
              </h2>
            </Reveal>

            <motion.div
              className="reflection-copy"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.p className="reflection-lead" variants={reveal}>
                Reflection turns activity into understanding. It reveals the
                habits, choices, and relationships behind every outcome.
              </motion.p>
              <motion.div variants={reveal}>
                <p>
                  This portfolio is not a finish line. It is an evolving record
                  of questions asked, lessons earned, and perspectives still
                  changing.
                </p>
                <a className="back-link" href="#home">
                  Back to top <span aria-hidden="true">↑</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          <footer className="footer" id="contact">
            <p>© 2027 Iker López</p>
            <p>IB Diploma Programme · CAS Portfolio</p>
            <p>Barcelona, Spain</p>
          </footer>
        </section>
      </main>
    </MotionConfig>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.85, delay, ease },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedText({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.span
      className="animated-text"
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: 0.04 } },
      }}
    >
      {Array.from(text).map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          variants={{
            hidden: { y: "110%", rotate: 2 },
            visible: {
              y: 0,
              rotate: 0,
              transition: { duration: 0.95, ease },
            },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

function ExperienceRow({
  experience,
}: {
  experience: (typeof experiences)[number];
}) {
  const reduceMotion = useReducedMotion();
  const pointer = useMotionValue(0);
  const titleX = useSpring(pointer, {
    stiffness: 210,
    damping: 26,
    mass: 0.24,
  });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointer.set(ratio * 14);
  };

  return (
    <motion.article
      className="experience-row"
      variants={reveal}
      initial="rest"
      whileHover="hover"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => pointer.set(0)}
    >
      <motion.div
        className="row-wash"
        aria-hidden="true"
        variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
        transition={{ duration: 0.5, ease }}
      />
      <p className="experience-number">({experience.number})</p>
      <div className="experience-heading">
        <motion.h3 style={{ x: titleX }}>{experience.title}</motion.h3>
        <p>{experience.strands}</p>
      </div>
      <div className="experience-copy">
        <p>{experience.description}</p>
        <span>{experience.focus}</span>
      </div>
      <motion.span
        className="row-arrow"
        aria-hidden="true"
        variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
        transition={{ duration: 0.45, ease }}
      >
        ↘
      </motion.span>
    </motion.article>
  );
}

function SectionHeader({
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
      className={`section-header${dark ? " section-header-dark" : ""}`}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.p variants={reveal}>
        <span>{number}</span>
        {title}
      </motion.p>
      <motion.p variants={reveal}>{meta}</motion.p>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="stat"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease }}
    >
      <p>{value}</p>
      <span>{label}</span>
    </motion.div>
  );
}
