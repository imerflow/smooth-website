"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  experiences,
  learningOutcomes,
  type OutcomeId,
} from "@/data/cas-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function LearningOutcomes() {
  const [active, setActive] = useState<OutcomeId>("RA1");
  const outcome = learningOutcomes.find((item) => item.id === active)!;
  const matches = experiences.filter((item) => item.outcomes.includes(active));

  return (
    <section className="section outcomes" id="outcomes">
      <SectionLabel number="04" title="CAS Learning Outcomes" meta="RA1—RA7" />
      <div className="outcomes-heading">
        <Reveal>
          <h2>
            Growth made
            <br />
            <span>visible through evidence.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            The IB Diploma Programme defines seven CAS Learning Outcomes that
            show how students grow through Creativity, Activity and Service.
            Each outcome below is connected to evidence from my own experiences.
          </p>
          <p className="outcomes-terminology">
            RA = Resultado de Aprendizaje / Learning Outcome
          </p>
        </Reveal>
      </div>

      <div className="outcomes-layout">
        <div className="outcome-tabs" role="tablist" aria-label="Learning outcomes">
          {learningOutcomes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`outcome-${item.id}`}
              aria-selected={active === item.id}
              aria-controls="outcome-panel"
              onClick={() => setActive(item.id)}
            >
              <span>{item.id}</span>
              <span>{item.title}</span>
              <span>{experiences.filter((exp) => exp.outcomes.includes(item.id)).length}</span>
            </button>
          ))}
        </div>

        <div
          className="outcome-panel"
          id="outcome-panel"
          role="tabpanel"
          aria-labelledby={`outcome-${active}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
            >
              <p className="outcome-id">{outcome.id}</p>
              <h3>{outcome.title}</h3>
              <p className="outcome-explanation">{outcome.description}</p>
              <div className="outcome-evidence">
                <h4>Evidence examples</h4>
                <ul>
                  {outcome.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
              <div className="outcome-matches">
                <h4>Matching experiences</h4>
                {matches.map((experience) => (
                  <Link
                    href={`/experiences/${experience.slug}`}
                    key={experience.slug}
                  >
                    {experience.shortTitle}
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
