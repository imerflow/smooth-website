"use client";

import Image from "next/image";
import type { ExperienceMedia } from "@/data/cas-content";
import { DocumentLink } from "./DocumentLink";

export function MediaCard({
  media,
  index,
  featured = false,
  onOpen,
}: {
  media: ExperienceMedia;
  index: number;
  featured?: boolean;
  onOpen: () => void;
}) {
  if (media.type === "document" || media.type === "external") {
    return <DocumentLink media={media} />;
  }

  return (
    <button
      className={`media-card${featured ? " is-featured" : ""}`}
      type="button"
      onClick={onOpen}
      aria-label={`Open ${media.type} ${index + 1}${media.caption ? `: ${media.caption}` : ""}`}
    >
      <span className="media-card-meta">
        <span>
          {media.type === "image" ? "Photo" : "Video"}{" "}
          {String(index + 1).padStart(2, "0")}
        </span>
        {media.date && <time>{media.date}</time>}
      </span>
      <div
        className="media-card-frame"
        style={
          media.type === "image"
            ? { aspectRatio: `${media.width} / ${media.height}` }
            : undefined
        }
      >
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={
              featured
                ? "(max-width: 700px) 100vw, 85vw"
                : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 40vw"
            }
          />
        ) : (
          <>
            {media.poster ? (
              <Image
                src={media.poster}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
            ) : (
              <span className="video-placeholder" aria-hidden="true">
                Video
              </span>
            )}
            <span className="play-mark" aria-hidden="true">
              Play
            </span>
          </>
        )}
      </div>
      {media.caption && <span className="media-card-caption">{media.caption}</span>}
    </button>
  );
}
