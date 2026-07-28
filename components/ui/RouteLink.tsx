"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function RouteLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    setTransitioning(true);
    window.setTimeout(() => router.push(href), 300);
  };

  return (
    <>
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {children}
      </a>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="route-transition"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
