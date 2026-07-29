import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Hero } from "@/components/hero/Hero";
import { CasOverview } from "@/components/sections/CasOverview";
import { FeaturedExperiences } from "@/components/sections/FeaturedExperiences";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { LearningOutcomes } from "@/components/sections/LearningOutcomes";
import { MonthlyReflections } from "@/components/sections/MonthlyReflections";
import { EvidencePreview } from "@/components/sections/EvidencePreview";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { KineticType } from "@/components/motion/KineticType";
import {
  getPublicFeaturedMediaBySlug,
  getPublishedEvidenceCategoryStatuses,
  getPublishedExperienceSlugsByCategory,
} from "@/data/cas-evidence.server";

export default function Home() {
  const evidenceCategoryStatuses = getPublishedEvidenceCategoryStatuses();
  const publishedExperienceSlugsByCategory =
    getPublishedExperienceSlugsByCategory();
  const featuredMediaBySlug = getPublicFeaturedMediaBySlug();

  return (
    <main className="site-shell">
      <SiteHeader />
      <Hero />
      <KineticType />
      <CasOverview />
      <FeaturedExperiences featuredMediaBySlug={featuredMediaBySlug} />
      <ExperienceTimeline previewMediaBySlug={featuredMediaBySlug} />
      <LearningOutcomes />
      <MonthlyReflections />
      <EvidencePreview
        categoryStatuses={evidenceCategoryStatuses}
        publishedExperienceSlugsByCategory={
          publishedExperienceSlugsByCategory
        }
      />
      <ClosingSection />
    </main>
  );
}
