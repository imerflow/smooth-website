import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ExperienceGallery } from "@/components/media/ExperienceGallery";
import { RouteLink } from "@/components/ui/RouteLink";
import { ExperienceProgress } from "@/components/motion/ExperienceProgress";
import { ScrollSection } from "@/components/motion/ScrollSection";
import { getPublicEvidenceForExperience } from "@/data/cas-evidence.server";
import {
  experiences,
  learningOutcomes,
  type EvidenceCategory,
} from "@/data/cas-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const evidenceCategoryLabels: Record<EvidenceCategory, string> = {
  photographs: "Photographs",
  certificates: "Certificates",
  confirmations: "Confirmations",
  "activity-tracking": "Activity tracking",
  videos: "Video",
  notes: "Notes",
};

const evidenceCategoryKeywords: Array<{
  category: EvidenceCategory;
  keywords: string[];
}> = [
  { category: "photographs", keywords: ["photograph", "photo", "team"] },
  { category: "certificates", keywords: ["certificate", "award"] },
  {
    category: "confirmations",
    keywords: ["confirmation", "email", "registration"],
  },
  {
    category: "activity-tracking",
    keywords: ["tracking", "garmin", "route", "attendance", "results"],
  },
  { category: "videos", keywords: ["video"] },
  {
    category: "notes",
    keywords: ["note", "programme", "slides", "materials", "research"],
  },
];

function getEvidenceCategory(item: string): EvidenceCategory | undefined {
  const normalised = item.toLowerCase();
  return evidenceCategoryKeywords.find(({ keywords }) =>
    keywords.some((keyword) => normalised.includes(keyword)),
  )?.category;
}

function formatEvidenceCategories(categories: EvidenceCategory[]): string {
  const labels = categories.map((category) =>
    evidenceCategoryLabels[category].toLowerCase(),
  );

  if (labels.length < 2) return labels[0] ?? "";
  return `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}`;
}

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);

  if (!experience) return {};

  return {
    title: experience.title,
    description: experience.summary,
    openGraph: {
      title: `${experience.title} | Iker López`,
      description: experience.summary,
      type: "article",
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const index = experiences.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const experience = experiences[index];
  const previous = experiences[(index - 1 + experiences.length) % experiences.length];
  const next = experiences[(index + 1) % experiences.length];
  const outcomes = learningOutcomes.filter((outcome) =>
    experience.outcomes.includes(outcome.id),
  );
  const publicEvidence = getPublicEvidenceForExperience(experience.slug);
  const publicCategories = Array.from(
    new Set(publicEvidence.media.map((item) => item.category)),
  );
  const checklist = experience.evidenceChecklist.map((item) => {
    const category = getEvidenceCategory(item);
    return {
      item,
      category,
      available: category ? publicCategories.includes(category) : false,
    };
  });
  const representedCategories = new Set(
    checklist.flatMap(({ category }) => (category ? [category] : [])),
  );
  const additionalPublicCategories = publicCategories.filter(
    (category) => !representedCategories.has(category),
  );

  return (
    <main className={`experience-page status-${experience.status}`} id="main-content">
      <SiteHeader />
      <ExperienceProgress />

      <article>
        <header className="experience-hero">
          <div className="experience-breadcrumb">
            <RouteLink href="/" className="back-home">
              ← Portfolio index
            </RouteLink>
            <span>{String(index + 1).padStart(2, "0")} / {experiences.length}</span>
          </div>

          <div className="experience-status-line">
            <span>{experience.status.replace("-", " ")}</span>
            <span>{experience.strands.join(" · ")}</span>
          </div>

          <h1>{experience.title}</h1>

          <div className="experience-facts">
            <dl>
              <div>
                <dt>Date</dt>
                <dd>{experience.dateLabel}</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{experience.hoursLabel}</dd>
              </div>
              {experience.role && (
                <div>
                  <dt>Role</dt>
                  <dd>{experience.role}</dd>
                </div>
              )}
              {experience.locationLabel && (
                <div>
                  <dt>Location</dt>
                  <dd>{experience.locationLabel}</dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        <ScrollSection className="detail-section detail-summary" id="summary">
          <p className="detail-label">01 / Summary</p>
          <p>{experience.summary}</p>
          {experience.award && (
            <aside>
              <span>Award recorded</span>
              <strong>{experience.award}</strong>
            </aside>
          )}
        </ScrollSection>

        <ScrollSection className="detail-section detail-two-column" id="challenge">
          <div>
            <p className="detail-label">02 / Challenge</p>
            <p>{experience.challenge}</p>
          </div>
          <div>
            <p className="detail-label">03 / Key learning</p>
            <p>{experience.keyLearning}</p>
          </div>
        </ScrollSection>

        <ScrollSection className="detail-section detail-outcomes" id="outcomes">
          <p className="detail-label">04 / Learning outcomes</p>
          <div>
            {outcomes.map((outcome) => (
              <article key={outcome.id}>
                <span>{outcome.id}</span>
                <h2>{outcome.title}</h2>
                <p>{outcome.description}</p>
              </article>
            ))}
          </div>
        </ScrollSection>

        <ScrollSection className="detail-section detail-media" id="media">
          <p className="detail-label">05 / Evidence and media</p>
          <div>
            <ExperienceGallery
              media={publicEvidence.media}
              featuredMedia={publicEvidence.featuredMedia}
              status={experience.status}
              awaitingRedaction={publicEvidence.awaitingRedaction}
              privacyNote={experience.privacyNote}
            />
          </div>
        </ScrollSection>

        <ScrollSection className="detail-section detail-evidence" id="evidence-status">
          <p className="detail-label">06 / Evidence status</p>
          <div>
            <p>
              {publicCategories.length > 0
                ? `Public evidence available: ${formatEvidenceCategories(publicCategories)}. Items without matching public media remain unpublished.`
                : "No public evidence is currently available. Checklist items remain unpublished."}
            </p>
            <ul>
              {checklist.map(({ item, available }) => (
                <li
                  className={available ? "evidence-available" : undefined}
                  key={item}
                >
                  <span aria-hidden="true">{available ? "✓" : "○"}</span>
                  {item}
                  <strong>{available ? "Available" : "Unpublished"}</strong>
                </li>
              ))}
              {additionalPublicCategories.map((category) => (
                <li className="evidence-available" key={category}>
                  <span aria-hidden="true">✓</span>
                  {evidenceCategoryLabels[category]} evidence
                  <strong>Available</strong>
                </li>
              ))}
            </ul>
            <p className="privacy-note">
              Privacy note: public evidence has completed review for release.
              Unpublished evidence must still be reviewed and redacted. Names,
              emails, private documents and identifiable images of minors must
              not be exposed.
            </p>
          </div>
        </ScrollSection>
      </article>

      <nav className="experience-pagination" aria-label="Experience navigation">
        <RouteLink href={`/experiences/${previous.slug}`}>
          <span>Previous</span>
          <strong>{previous.shortTitle}</strong>
        </RouteLink>
        <RouteLink href={`/experiences/${next.slug}`}>
          <span>Next</span>
          <strong>{next.shortTitle}</strong>
        </RouteLink>
      </nav>
    </main>
  );
}
