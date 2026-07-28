"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ExperienceMedia } from "@/data/cas-content";
import { VideoPlayer } from "./VideoPlayer";

type VisualMedia = Extract<ExperienceMedia, { type: "image" | "video" }>;

export function MediaLightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: VisualMedia[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const active = items[index];

  const showPrevious = () =>
    setIndex((current) => (current - 1 + items.length) % items.length);
  const showNext = () =>
    setIndex((current) => (current + 1) % items.length);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && items.length > 1) {
        setIndex((current) => (current - 1 + items.length) % items.length);
      }
      if (event.key === "ArrowRight" && items.length > 1) {
        setIndex((current) => (current + 1) % items.length);
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button, a[href], video[controls]",
          ),
        ).filter((element) => !element.hasAttribute("disabled"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length, onClose]);

  return (
    <motion.div
      className="media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Evidence media viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") touchStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "touch" || touchStart.current === null) return;
          const distance = event.clientX - touchStart.current;
          if (Math.abs(distance) > 45 && items.length > 1) {
            if (distance > 0) showPrevious();
            else showNext();
          }
          touchStart.current = null;
        }}
      >
        <div className="lightbox-toolbar">
          <p>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </p>
          <button type="button" ref={closeRef} onClick={onClose}>
            Close ×
          </button>
        </div>

        <div className="lightbox-stage">
          {active.type === "image" ? (
            <div
              className="lightbox-image"
              style={{ aspectRatio: `${active.width} / ${active.height}` }}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="95vw"
                priority
              />
            </div>
          ) : (
            <VideoPlayer media={active} className="lightbox-video" />
          )}
        </div>

        <div className="lightbox-footer">
          <p>{active.caption || "Evidence media"}</p>
          {items.length > 1 && (
            <div>
              <button type="button" onClick={showPrevious} aria-label="Previous media">
                ←
              </button>
              <button type="button" onClick={showNext} aria-label="Next media">
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
