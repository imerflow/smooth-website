"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import type {
  ExperienceMedia,
  ExperienceStatus,
} from "@/data/cas-content";
import { EvidenceEmptyState } from "./EvidenceEmptyState";
import { MediaCard } from "./MediaCard";
import { MediaLightbox } from "./MediaLightbox";

type VisualMedia = Extract<ExperienceMedia, { type: "image" | "video" }>;

function subscribeToHydration() {
  return () => {};
}

export function ExperienceGallery({
  media,
  featuredMedia,
  status,
  awaitingRedaction = false,
  privacyNote,
}: {
  media: ExperienceMedia[];
  featuredMedia?: Extract<ExperienceMedia, { type: "image" }>;
  status: ExperienceStatus;
  awaitingRedaction?: boolean;
  privacyNote?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const publicMedia = media.filter((item) => item.privacy === "public");
  const visualMedia = publicMedia.filter(
    (item): item is VisualMedia =>
      item.type === "image" || item.type === "video",
  );
  const featuredItem = featuredMedia
    ? publicMedia.find(
        (item): item is Extract<ExperienceMedia, { type: "image" }> =>
          item.type === "image" && item.src === featuredMedia.src,
      )
    : undefined;
  const remainingMedia = featuredItem
    ? publicMedia.filter((item) => item !== featuredItem)
    : publicMedia;
  if (!publicMedia.length) {
    return (
      <>
        <EvidenceEmptyState
          status={status}
          awaitingRedaction={awaitingRedaction}
        />
        {privacyNote && <p className="gallery-privacy">{privacyNote}</p>}
      </>
    );
  }

  return (
    <>
      <div
        className={`experience-gallery${featuredItem ? " has-featured" : ""}`}
      >
        {featuredItem && (
          <MediaCard
            featured
            media={featuredItem}
            index={publicMedia.indexOf(featuredItem)}
            key={featuredItem.src}
            onOpen={() => {
              const visualIndex = visualMedia.indexOf(featuredItem);
              if (visualIndex >= 0) setSelected(visualIndex);
            }}
          />
        )}
        {remainingMedia.map((item) => {
          const index = publicMedia.indexOf(item);
          const visualIndex = visualMedia.indexOf(item as VisualMedia);
          return (
            <MediaCard
              media={item}
              index={index}
              key={
                item.type === "external"
                  ? item.href
                  : item.type === "document"
                    ? item.src
                    : item.src
              }
              onOpen={() => {
                if (visualIndex >= 0) setSelected(visualIndex);
              }}
            />
          );
        })}
      </div>
      {privacyNote && <p className="gallery-privacy">{privacyNote}</p>}
      {hydrated &&
        createPortal(
          <AnimatePresence>
            {selected !== null && (
              <MediaLightbox
                items={visualMedia}
                initialIndex={selected}
                onClose={() => setSelected(null)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
