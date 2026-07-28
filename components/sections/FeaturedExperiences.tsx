"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  featuredExperiences,
  type ExperienceMedia,
} from "@/data/cas-content";
import { RouteLink } from "@/components/ui/RouteLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type PublicFeaturedImage = Extract<ExperienceMedia, { type: "image" }> & {
  privacy: "public";
};

export function FeaturedExperiences({
  featuredMediaBySlug,
}: {
  featuredMediaBySlug: Record<string, PublicFeaturedImage>;
}) {
  const orderedExperiences = [...featuredExperiences].sort(
    (first, second) =>
      Number(Boolean(featuredMediaBySlug[second.slug])) -
      Number(Boolean(featuredMediaBySlug[first.slug])),
  );

  return (
    <section className="section featured" id="featured">
      <SectionLabel
        number="02"
        title="Featured experiences"
        meta="Six selected records"
      />
      <div className="featured-heading">
        <Reveal>
          <h2>
            Work that changed
            <br />
            <span>the way I work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            A horizontal reading sequence of completed, ongoing and projected
            work. Each status is shown explicitly.
          </p>
        </Reveal>
      </div>

      <div className="featured-track" aria-label="Featured experiences">
        {orderedExperiences.map((experience, index) => {
          const featuredMedia = featuredMediaBySlug[experience.slug];

          return (
            <motion.article
              className={`featured-card status-${experience.status}`}
              key={experience.slug}
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.68,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <RouteLink
                href={`/experiences/${experience.slug}`}
                className="featured-link"
                ariaLabel={`Read ${experience.title}`}
              >
                <div className="featured-top">
                  <span>0{index + 1}</span>
                  <span>{experience.status.replace("-", " ")}</span>
                </div>
                <div
                  className={`media-placeholder${featuredMedia ? " has-media" : ""}`}
                  aria-hidden={featuredMedia ? undefined : true}
                >
                  {featuredMedia ? (
                    <Image
                      src={featuredMedia.src}
                      alt={featuredMedia.alt}
                      fill
                      sizes="(max-width: 700px) 86vw, (max-width: 1100px) 78vw, 770px"
                    />
                  ) : (
                    <>
                      <span>
                        {experience.strands
                          .map((strand) => strand[0])
                          .join(" / ")}
                      </span>
                      <span>Public evidence pending</span>
                    </>
                  )}
                </div>
                <div className="featured-content">
                  <p>{experience.dateLabel}</p>
                  <h3>{experience.shortTitle}</h3>
                  <p>{experience.keyLearning}</p>
                  <div>
                    <span>{experience.strands.join(" · ")}</span>
                    <span>{experience.outcomes.join(" · ")}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </div>
              </RouteLink>
            </motion.article>
          );
        })}
      </div>
      <p className="horizontal-hint">
        Scroll horizontally <span aria-hidden="true">→</span>
      </p>
    </section>
  );
}
