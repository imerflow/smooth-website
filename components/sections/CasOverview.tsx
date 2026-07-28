"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  experiences,
  publicStats,
  type CasStrand,
} from "@/data/cas-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const strands: CasStrand[] = ["Service", "Creativity", "Activity"];

export function CasOverview() {
  const [active, setActive] = useState<CasStrand>("Service");
  const filtered = useMemo(
    () => experiences.filter((item) => item.strands.includes(active)),
    [active],
  );

  return (
    <section className="section cas-overview" id="about">
      <SectionLabel number="01" title="CAS overview" meta="The whole record" />
      <div className="overview-heading">
        <Reveal>
          <h2>
            Three strands.
            <br />
            <span>One evolving practice.</span>
          </h2>
        </Reveal>
        <Reveal className="overview-copy" delay={0.08}>
          <p>
            Explore the documented experiences by strand. Counts are derived
            directly from the portfolio record and include completed, ongoing,
            pending and projected work.
          </p>
        </Reveal>
      </div>

      <div className="strand-interface">
        <div className="strand-tabs" role="tablist" aria-label="CAS strands">
          {strands.map((strand, index) => {
            const count = experiences.filter((item) =>
              item.strands.includes(strand),
            ).length;
            return (
              <button
                key={strand}
                type="button"
                role="tab"
                aria-selected={active === strand}
                aria-controls="strand-panel"
                id={`strand-${strand.toLowerCase()}`}
                onClick={() => setActive(strand)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(strand);
                }}
              >
                <span>0{index + 1}</span>
                <strong>{strand}</strong>
                <small>{count} experiences</small>
              </button>
            );
          })}
        </div>

        <div
          className="strand-panel"
          id="strand-panel"
          role="tabpanel"
          aria-labelledby={`strand-${active.toLowerCase()}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p className="strand-count">{String(filtered.length).padStart(2, "0")}</p>
              <p className="strand-description">
                {active} experiences in the current portfolio record.
              </p>
              <ul>
                {filtered.slice(0, 5).map((experience) => (
                  <li key={experience.slug}>
                    <Link href={`/experiences/${experience.slug}`}>
                      <span>{experience.shortTitle}</span>
                      <small>{experience.status.replace("-", " ")}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="public-stats" aria-label="Selected verified statistics">
        {publicStats.map((stat) => (
          <Reveal key={stat.label}>
            <p>{stat.value}</p>
            <span>{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
