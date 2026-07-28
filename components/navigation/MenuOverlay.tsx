"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const menuItems = [
  ["About", "#about"],
  ["Experiences", "#featured"],
  ["Timeline", "#timeline"],
  ["Outcomes", "#outcomes"],
  ["Reflections", "#reflections"],
  ["Evidence", "#evidence"],
] as const;

export function MenuOverlay({
  onClose,
  triggerRef,
  routePrefix,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  routePrefix: string;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }

      if (
        event.key === "Tab" &&
        event.shiftKey &&
        document.activeElement === triggerRef.current
      ) {
        event.preventDefault();
        lastLinkRef.current?.focus();
      } else if (
        event.key === "Tab" &&
        !event.shiftKey &&
        document.activeElement === lastLinkRef.current
      ) {
        event.preventDefault();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, triggerRef]);

  return (
    <motion.div
      className="menu-overlay"
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <nav className="overlay-links" aria-label="Editorial navigation">
        {menuItems.map(([label, hash], index) => (
          <motion.div
            key={hash}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.58,
              delay: 0.08 + index * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={`${routePrefix}${hash}`}
              ref={
                index === 0
                  ? firstLinkRef
                  : index === menuItems.length - 1
                    ? lastLinkRef
                    : undefined
              }
              onClick={onClose}
            >
              <span>0{index + 1}</span>
              <strong>{label}</strong>
              <span aria-hidden="true">↘</span>
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="overlay-foot">
        <p>IB Diploma Programme · CAS Portfolio</p>
        <p>Barcelona, Spain · 2025—2027</p>
      </div>
    </motion.div>
  );
}
