"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ExperienceMedia } from "@/data/cas-content";
import { DocumentLink } from "./DocumentLink";

function subscribeToMobile(onStoreChange: () => void) {
  const media = window.matchMedia("(max-width: 700px)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 700px)").matches;
}

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
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    () => false,
  );
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion || !featured ? [0, 0] : mobile ? [-14, 14] : [-46, 46],
  );

  if (media.type === "document" || media.type === "external") {
    return <DocumentLink media={media} />;
  }

  return (
    <motion.button
      className={`media-card${featured ? " is-featured" : ""}`}
      type="button"
      onClick={onOpen}
      data-cursor={media.type === "image" ? "VIEW" : "PLAY"}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        event.currentTarget.style.setProperty("--magnetic-x", `${x * 3}px`);
        event.currentTarget.style.setProperty("--magnetic-y", `${y * 3}px`);
        event.currentTarget.style.setProperty(
          "--magnetic-rotate",
          `${x * 1.2}deg`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--magnetic-x", "0px");
        event.currentTarget.style.setProperty("--magnetic-y", "0px");
        event.currentTarget.style.setProperty("--magnetic-rotate", "0deg");
      }}
      aria-label={`Open ${media.type} ${index + 1}${media.caption ? `: ${media.caption}` : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      <span className="media-card-meta">
        <span>
          {media.type === "image" ? "Photo" : "Video"}{" "}
          {String(index + 1).padStart(2, "0")}
        </span>
        {media.date && <time>{media.date}</time>}
      </span>
      <motion.div
        ref={frameRef}
        className="media-card-frame"
        variants={{
          hidden: reduceMotion
            ? { opacity: 0 }
            : {
                clipPath: featured
                  ? "inset(100% 0 0 0)"
                  : "inset(0 0 100% 0)",
                y: featured ? 62 : 34,
              },
          visible: {
            opacity: 1,
            clipPath: "inset(0% 0 0% 0)",
            y: 0,
            transition: {
              duration: reduceMotion ? 0.18 : featured ? 1.08 : 0.88,
              delay: reduceMotion ? 0 : Math.min(index * 0.08, 0.24),
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        style={
          media.type === "image"
            ? { aspectRatio: `${media.width} / ${media.height}` }
            : undefined
        }
      >
        {media.type === "image" ? (
          <motion.div
            className="media-card-image"
            style={{ y: parallaxY }}
            variants={{
              hidden: reduceMotion ? { opacity: 0 } : { scale: 1.08 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: reduceMotion ? 0.18 : 1.05,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
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
          </motion.div>
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
      </motion.div>
      {media.caption && (
        <motion.span
          className="media-card-caption"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: reduceMotion ? 0.18 : 0.65,
            delay: reduceMotion ? 0 : 0.3 + Math.min(index * 0.07, 0.2),
          }}
        >
          {media.caption}
        </motion.span>
      )}
    </motion.button>
  );
}
