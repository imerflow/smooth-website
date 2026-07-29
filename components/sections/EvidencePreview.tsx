"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  contentWarnings,
  experiences,
  type EvidenceCategory,
} from "@/data/cas-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const categories: Array<{
  id: EvidenceCategory;
  label: string;
  keywords: string[];
}> = [
  {
    id: "photographs",
    label: "Photographs",
    keywords: ["photograph", "photo", "team"],
  },
  {
    id: "certificates",
    label: "Certificates",
    keywords: ["certificate", "award"],
  },
  {
    id: "confirmations",
    label: "Confirmations",
    keywords: ["confirmation", "email", "registration"],
  },
  {
    id: "activity-tracking",
    label: "Activity tracking",
    keywords: ["tracking", "garmin", "route", "attendance", "results"],
  },
  {
    id: "videos",
    label: "Videos",
    keywords: ["video"],
  },
  {
    id: "notes",
    label: "Notes",
    keywords: ["note", "programme", "slides", "materials", "research"],
  },
];

type CategoryStatus =
  | "available"
  | "awaiting upload"
  | "awaiting redaction"
  | "projected";

export type EvidenceCategoryStatuses = Partial<
  Record<EvidenceCategory, "available" | "awaiting redaction">
>;

type EvidenceSelection = {
  label: string;
  status: CategoryStatus;
  items: Array<{ experience: string; evidence: string }>;
  availableExperiences: string[];
};

function getGroups(
  categoryStatuses: EvidenceCategoryStatuses,
  publishedExperienceSlugsByCategory: Partial<
    Record<EvidenceCategory, string[]>
  >,
): EvidenceSelection[] {
  return categories.map((category) => {
    const related = experiences.flatMap((experience) =>
      experience.evidenceChecklist
        .filter((item) =>
          category.keywords.some((keyword) =>
            item.toLowerCase().includes(keyword),
          ),
        )
        .map((evidence) => ({
          experience: experience.shortTitle,
          experienceStatus: experience.status,
          evidence,
        })),
    );
    const publicationStatus = categoryStatuses[category.id];
    let status: CategoryStatus;
    if (publicationStatus) {
      status = publicationStatus;
    } else if (
      related.length > 0 &&
      related.every((item) => item.experienceStatus === "projected")
    ) {
      status = "projected";
    } else {
      status = "awaiting upload";
    }

    return {
      label: category.label,
      status,
      items: related.map(({ experience, evidence }) => ({
        experience,
        evidence,
      })),
      availableExperiences: experiences
        .filter((experience) =>
          publishedExperienceSlugsByCategory[category.id]?.includes(
            experience.slug,
          ),
        )
        .map((experience) => experience.shortTitle),
    };
  });
}

export function EvidencePreview({
  categoryStatuses,
  publishedExperienceSlugsByCategory,
}: {
  categoryStatuses: EvidenceCategoryStatuses;
  publishedExperienceSlugsByCategory: Partial<
    Record<EvidenceCategory, string[]>
  >;
}) {
  const [selection, setSelection] = useState<EvidenceSelection | null>(null);
  const evidenceGroups = getGroups(
    categoryStatuses,
    publishedExperienceSlugsByCategory,
  );

  return (
    <section className="section evidence" id="evidence">
      <SectionLabel number="06" title="Evidence and media" meta="Publication status" />
      <div className="evidence-heading">
        <Reveal>
          <h2>
            A system ready
            <br />
            <span>for real evidence.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            Statuses come from the actual media records and experience status.
            Empty categories never imply that evidence has been uploaded.
          </p>
        </Reveal>
      </div>

      <div className="evidence-grid evidence-grid-six">
        {evidenceGroups.map((group, index) => (
          <motion.button
            type="button"
            data-cursor="VIEW"
            key={group.label}
            onClick={() => setSelection(group)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.04 }}
          >
            <span>0{index + 1}</span>
            <div className="evidence-placeholder" aria-hidden="true">
              <span>{group.status}</span>
            </div>
            <strong>{group.label}</strong>
            <small>{group.status}</small>
          </motion.button>
        ))}
      </div>

      <p className="privacy-note">Privacy note: {contentWarnings[2]}</p>

      <AnimatePresence>
        {selection && (
          <motion.div
            className="evidence-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${selection.label} evidence status`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelection(null)}
          >
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div>
                <p>{selection.status}</p>
                <button type="button" onClick={() => setSelection(null)}>
                  Close ×
                </button>
              </div>
              <h3>{selection.label}</h3>
              <p className="not-uploaded">
                {selection.status === "available"
                  ? "Public media is available in the experience gallery."
                  : selection.status === "projected"
                    ? "Evidence will be collected only after the projected work takes place."
                    : selection.status === "awaiting redaction"
                      ? "Files require privacy review or redaction before publication."
                      : "Checklist references exist, but no public media is uploaded."}
              </p>
              {selection.availableExperiences.length > 0 && (
                <p className="not-uploaded">
                  Public media: {selection.availableExperiences.join(", ")}.
                </p>
              )}
              <ul>
                {selection.items.map((item, index) => (
                  <li key={`${item.experience}-${item.evidence}-${index}`}>
                    <span>{item.experience}</span>
                    <span>{item.evidence}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
