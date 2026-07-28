import type { ExperienceMedia } from "@/data/cas-content";

type DocumentMedia = Extract<ExperienceMedia, { type: "document" | "external" }>;

export function DocumentLink({ media }: { media: DocumentMedia }) {
  const href = media.type === "document" ? media.src : media.href;

  return (
    <a
      className="document-link"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{media.type === "document" ? media.format || "Document" : "External"}</span>
      <strong>{media.label}</strong>
      {media.caption && <small>{media.caption}</small>}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
