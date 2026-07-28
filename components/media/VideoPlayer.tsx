import type { ExperienceMedia } from "@/data/cas-content";

type VideoMedia = Extract<ExperienceMedia, { type: "video" }>;

export function VideoPlayer({
  media,
  className,
}: {
  media: VideoMedia;
  className?: string;
}) {
  return (
    <figure className={className}>
      <video
        controls
        preload="metadata"
        poster={media.poster}
        playsInline
        aria-label={media.caption || "Experience evidence video"}
      >
        <source src={media.src} type="video/mp4" />
        {media.transcript && (
          <track
            kind="captions"
            src={media.transcript}
            srcLang="en"
            label="English"
          />
        )}
        Your browser does not support embedded video.
      </video>
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}
