"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  experiences,
  type CasStrand,
  type Experience,
} from "@/data/cas-content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

type TimelineGroup = {
  label: string;
  slugs: string[];
};

const timelineGroups: TimelineGroup[] = [
  {
    label: "September 2025",
    slugs: ["bingo-musical", "running-spinning", "boxing"],
  },
  {
    label: "October 2025",
    slugs: [
      "nasa-space-apps",
      "cm-talks-david-bueno",
      "via-verda-leadership",
    ],
  },
  {
    label: "November 2025",
    slugs: [
      "gran-recapte-2025",
      "parc-sequia-leadership",
      "brazilian-jiu-jitsu",
      "ocean-documentary",
    ],
  },
  {
    label: "Projected 2026",
    slugs: ["bojos-economia", "ecommerce-project", "popular-races"],
  },
];

const filters: Array<"All" | CasStrand> = [
  "All",
  "Service",
  "Creativity",
  "Activity",
];

function getExperience(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}

export function ExperienceTimeline() {
  const [filter, setFilter] = useState<"All" | CasStrand>("All");
  const groups = useMemo(
    () =>
      timelineGroups.map((group) => ({
        ...group,
        items: group.slugs
          .map(getExperience)
          .filter((item): item is Experience => Boolean(item))
          .filter(
            (item) => filter === "All" || item.strands.includes(filter),
          ),
      })),
    [filter],
  );

  return (
    <section className="section timeline" id="timeline">
      <SectionLabel number="03" title="Timeline" meta="September 2025 onward" />
      <div className="timeline-heading">
        <Reveal>
          <h2>
            A record of
            <br />
            <span>progress, not completion.</span>
          </h2>
        </Reveal>
        <div className="filter-row" aria-label="Filter timeline by strand">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="timeline-list">
        <motion.div
          className="timeline-progress"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {groups.map((group) => (
          <div className="timeline-group" key={group.label}>
            <h3>{group.label}</h3>
            <div>
              {group.items.length ? (
                group.items.map((experience) => (
                  <motion.article
                    layout
                    key={experience.slug}
                    className={`timeline-item status-${experience.status}`}
                  >
                    <span className="timeline-dot" aria-hidden="true" />
                    <Link href={`/experiences/${experience.slug}`}>
                      <div>
                        <h4>{experience.shortTitle}</h4>
                        <p>{experience.dateLabel}</p>
                      </div>
                      <div>
                        <span>{experience.strands.join(" · ")}</span>
                        <span>{experience.status.replace("-", " ")}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))
              ) : (
                <p className="empty-filter">No {filter.toLowerCase()} entries.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="status-key" aria-label="Timeline status key">
        {["completed", "ongoing", "reflection pending", "projected"].map(
          (status) => (
            <span key={status}>{status}</span>
          ),
        )}
      </div>
    </section>
  );
}
