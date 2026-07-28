import "server-only";

import {
  type EvidenceCategory,
  type ExperienceMedia,
} from "@/data/cas-content";

type PublicExperienceMedia = ExperienceMedia & { privacy: "public" };
type PublicFeaturedImage = Extract<ExperienceMedia, { type: "image" }> & {
  privacy: "public";
};

type ExperienceEvidence = {
  media: ExperienceMedia[];
  featuredMedia?: string;
};

const experienceEvidence: Record<string, ExperienceEvidence> = {
  "bingo-musical": {
    media: [
      {
        type: "image",
        category: "photographs",
        src: "/evidence/bingo-musical/2025-09-26-student-animators-leading.webp",
        alt: "Student animators leading the musical bingo activity from the front of the school court.",
        width: 1800,
        height: 1350,
        caption: "Student animators leading the musical bingo activity.",
        date: "26 September 2025",
        privacy: "public",
      },
      {
        type: "image",
        category: "photographs",
        src: "/evidence/bingo-musical/2025-09-26-event-participation.webp",
        alt: "Student animators leading the activity while pupils participate on the school court.",
        width: 1800,
        height: 1350,
        caption: "Animators and pupils participating in the school-wide activity.",
        date: "26 September 2025",
        privacy: "public",
      },
      {
        type: "image",
        category: "photographs",
        src: "/evidence/bingo-musical/2025-09-26-bingo-activity-wide.webp",
        alt: "A wide view of pupils completing their musical bingo sheets on the school court.",
        width: 1800,
        height: 1350,
        caption: "Participants completing their musical bingo sheets.",
        date: "26 September 2025",
        privacy: "public",
      },
      {
        type: "video",
        category: "videos",
        src: "/evidence/bingo-musical/2025-09-26-group-dance.mp4",
        poster:
          "/evidence/bingo-musical/2025-09-26-group-dance-poster.webp",
        caption:
          "Student animators leading a group dance during the musical bingo activity.",
        date: "26 September 2025",
        privacy: "public",
      },
    ],
  },
  "nasa-space-apps": {
    media: [
      {
        type: "image",
        category: "photographs",
        src: "/evidence/nasa-space-apps/2025-10-05-team-award.webp",
        alt: "The student team holding its award in front of the NASA Space Apps Challenge Barcelona backdrop.",
        width: 1800,
        height: 1350,
        caption:
          "Team photograph after receiving the Creativity and Innovation Award at NASA Space Apps Barcelona.",
        date: "5 October 2025",
        privacy: "public",
      },
      {
        type: "image",
        category: "photographs",
        src: "/evidence/nasa-space-apps/2025-10-03-team-at-event.webp",
        alt: "The student team standing together at the NASA Space Apps Challenge venue in Barcelona.",
        width: 1406,
        height: 937,
        caption: "The team at the NASA Space Apps Challenge Barcelona event.",
        date: "3 October 2025",
        privacy: "public",
      },
      {
        type: "image",
        category: "photographs",
        src: "/evidence/nasa-space-apps/2025-10-05-award-ceremony.webp",
        alt: "Award recipients, organisers and participants gathered on stage at NASA Space Apps Barcelona.",
        width: 1800,
        height: 1350,
        caption:
          "Award ceremony with participants and organisers at the Barcelona event.",
        date: "5 October 2025",
        privacy: "public",
      },
    ],
    featuredMedia:
      "/evidence/nasa-space-apps/2025-10-05-team-award.webp",
  },
};

const emptyMedia: ExperienceMedia[] = [];

function getExperienceMedia(slug: string): ExperienceMedia[] {
  return experienceEvidence[slug]?.media ?? emptyMedia;
}

function isPublicMedia(
  media: ExperienceMedia,
): media is PublicExperienceMedia {
  return media.privacy === "public";
}

export function getPublicEvidenceForExperience(slug: string): {
  media: PublicExperienceMedia[];
  featuredMedia?: PublicFeaturedImage;
  awaitingRedaction: boolean;
} {
  const evidence = experienceEvidence[slug];
  const media = getExperienceMedia(slug);
  const featuredMedia = evidence?.featuredMedia
    ? media.find(
        (item): item is PublicFeaturedImage =>
          item.type === "image" &&
          item.privacy === "public" &&
          item.src === evidence.featuredMedia,
      )
    : undefined;

  return {
    media: media.filter(isPublicMedia),
    featuredMedia,
    awaitingRedaction: media.some(
      (item) => item.privacy === "redact" || item.privacy === "private",
    ),
  };
}

export function getPublicFeaturedMediaBySlug(): Record<
  string,
  PublicFeaturedImage
> {
  return Object.fromEntries(
    Object.entries(experienceEvidence).flatMap(([slug, evidence]) => {
      if (!evidence.featuredMedia) return [];

      const featured = evidence.media.find(
        (item): item is PublicFeaturedImage =>
          item.type === "image" &&
          item.privacy === "public" &&
          item.src === evidence.featuredMedia,
      );

      return featured ? [[slug, featured]] : [];
    }),
  );
}

export function getPublishedEvidenceCategoryStatuses(): Partial<
  Record<EvidenceCategory, "available" | "awaiting redaction">
> {
  const statuses: Partial<
    Record<EvidenceCategory, "available" | "awaiting redaction">
  > = {};

  Object.values(experienceEvidence)
    .flatMap((evidence) => evidence.media)
    .forEach((item) => {
      if (item.privacy === "public") {
        statuses[item.category] = "available";
      } else if (!statuses[item.category]) {
        statuses[item.category] = "awaiting redaction";
      }
    });

  return statuses;
}

export function getPublishedExperienceSlugsByCategory(): Partial<
  Record<EvidenceCategory, string[]>
> {
  const experienceSlugs: Partial<Record<EvidenceCategory, string[]>> = {};

  Object.entries(experienceEvidence).forEach(([slug, evidence]) => {
    const publicCategories = new Set(
      evidence.media.filter(isPublicMedia).map((item) => item.category),
    );

    publicCategories.forEach((category) => {
      experienceSlugs[category] = [
        ...(experienceSlugs[category] ?? []),
        slug,
      ];
    });
  });

  return experienceSlugs;
}
