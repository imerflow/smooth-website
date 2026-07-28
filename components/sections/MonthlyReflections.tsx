"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { monthlyReflections } from "@/data/cas-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function MonthlyReflections() {
  const [active, setActive] = useState(0);

  return (
    <section className="section reflections" id="reflections">
      <SectionLabel
        number="05"
        title="Monthly reflections"
        meta="September—December 2025"
      />
      <div className="reflections-heading">
        <Reveal>
          <h2>
            What changed
            <br />
            <span>month by month.</span>
          </h2>
        </Reveal>
      </div>

      <div className="reflection-sequence">
        <div className="reflection-index" role="tablist" aria-label="Monthly reflections">
          {monthlyReflections.map((reflection, index) => (
            <button
              key={reflection.month}
              type="button"
              role="tab"
              id={`reflection-${index}`}
              aria-selected={active === index}
              aria-controls="reflection-panel"
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <strong>{reflection.month}</strong>
              <small>{reflection.status}</small>
            </button>
          ))}
        </div>

        <div
          className="monthly-panel"
          id="reflection-panel"
          role="tabpanel"
          aria-labelledby={`reflection-${active}`}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={monthlyReflections[active].month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38 }}
              className={`status-${monthlyReflections[active].status}`}
            >
              <p>{monthlyReflections[active].month}</p>
              <h3>{monthlyReflections[active].title}</h3>
              <p>{monthlyReflections[active].summary}</p>
              <span>{monthlyReflections[active].status}</span>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
