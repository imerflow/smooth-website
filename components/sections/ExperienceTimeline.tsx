"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  experiences,
  type CasStrand,
  type Experience,
  type ExperienceMedia,
} from "@/data/cas-content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { RouteLink } from "@/components/ui/RouteLink";

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

type PublicPreview = Extract<ExperienceMedia, { type: "image" }> & {
  privacy: "public";
};

export function ExperienceTimeline({
  previewMediaBySlug,
}: {
  previewMediaBySlug: Record<string, PublicPreview>;
}) {
  const [filter, setFilter] = useState<"All" | CasStrand>("All");
  const reduceMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState(timelineGroups[0].label);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 32%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
  });
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
        <p className="timeline-active" aria-live="polite">
          In view · {activeGroup}
        </p>
      </div>

      <div className="timeline-list" ref={timelineRef}>
        <motion.div
          className="timeline-progress"
          aria-hidden="true"
          style={{ scaleY: reduceMotion ? 1 : lineProgress }}
        />
        {groups.map((group) => (
          <motion.div
            className={`timeline-group${activeGroup === group.label ? " is-active" : ""}`}
            key={group.label}
            onViewportEnter={() => setActiveGroup(group.label)}
            viewport={{ amount: 0.35 }}
          >
            <h3>{group.label}</h3>
            <div>
              {group.items.length ? (
                group.items.map((experience) => (
                  <motion.article
                    layout
                    key={experience.slug}
                    className={`timeline-item status-${experience.status}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{
                      duration: 0.48,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onViewportEnter={() => setActivePreview(experience.slug)}
                    onPointerEnter={() => setActivePreview(experience.slug)}
                  >
                    <span className="timeline-dot" aria-hidden="true" />
                    <RouteLink
                      href={`/experiences/${experience.slug}`}
                      transitionLabel={experience.shortTitle}
                    >
                      <div>
                        <h4>{experience.shortTitle}</h4>
                        <p>{experience.dateLabel}</p>
                      </div>
                      <div>
                        <span>{experience.strands.join(" · ")}</span>
                        <span>{experience.status.replace("-", " ")}</span>
                      </div>
                    </RouteLink>
                  </motion.article>
                ))
              ) : (
                <p className="empty-filter">No {filter.toLowerCase()} entries.</p>
              )}
            </div>
          </motion.div>
        ))}
        {activePreview && previewMediaBySlug[activePreview] && (
          <motion.div
            className="timeline-preview"
            aria-hidden="true"
            key={activePreview}
            initial={{ opacity: 0, scale: 0.88, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={previewMediaBySlug[activePreview].src}
              alt=""
              fill
              sizes="280px"
            />
          </motion.div>
        )}
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
