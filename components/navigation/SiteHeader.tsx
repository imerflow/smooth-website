"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MenuOverlay } from "./MenuOverlay";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  const routePrefix = pathname === "/" ? "" : "/";

  return (
    <>
      <motion.header
        className={`site-header${open ? " site-header-open" : ""}`}
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="header-inner" aria-label="Primary navigation">
          <Link href="/" className="wordmark" aria-label="Iker López, home">
            IKER LÓPEZ
          </Link>
          <button
            className="menu-toggle"
            type="button"
            ref={triggerRef}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "CLOSE" : "MENU"}{" "}
            <span aria-hidden="true">{open ? "×" : "+"}</span>
          </button>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && (
          <MenuOverlay
            onClose={closeMenu}
            triggerRef={triggerRef}
            routePrefix={routePrefix}
          />
        )}
      </AnimatePresence>
    </>
  );
}
