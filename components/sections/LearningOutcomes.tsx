"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  experiences,
  learningOutcomes,
  type OutcomeId,
} from "@/data/cas-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RouteLink } from "@/components/ui/RouteLink";

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
          {learningOutcomes.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              id={`outcome-${item.id}`}
              aria-selected={active === item.id}
              aria-controls="outcome-panel"
              onClick={() => setActive(item.id)}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{
                duration: 0.62,
                delay: index * 0.065,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span>{item.id}</span>
              <span>{item.title}</span>
              <span>{experiences.filter((exp) => exp.outcomes.includes(item.id)).length}</span>
            </motion.button>
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
              initial={{ opacity: 0, y: 46, scale: 0.94 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
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
                  <RouteLink
                    href={`/experiences/${experience.slug}`}
                    key={experience.slug}
                    transitionLabel={experience.shortTitle}
                  >
                    {experience.shortTitle}
                    <span aria-hidden="true">↗</span>
                  </RouteLink>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
