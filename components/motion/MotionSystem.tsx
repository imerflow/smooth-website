"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type RouteMotionContextValue = {
  navigate: (href: string, label?: string) => void;
};

const RouteMotionContext = createContext<RouteMotionContextValue | null>(null);
const loaderKey = "iker-cas-intro-seen";

function SessionLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion || window.sessionStorage.getItem(loaderKey)) return;

    window.sessionStorage.setItem(loaderKey, "true");
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const start = performance.now();
    let frame = 0;

    const update = (time: number) => {
      const next = Math.min(100, Math.round(((time - start) / 980) * 100));
      setProgress(next);
      if (next < 100) {
        frame = window.requestAnimationFrame(update);
      } else {
        window.setTimeout(() => setVisible(false), 160);
      }
    };

    frame = window.requestAnimationFrame(update);
    return () => {
      window.clearTimeout(showTimer);
      window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <motion.div
      className="session-loader"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="session-loader-title">
        <strong>IKER LÓPEZ</strong>
        <span>CAS PORTFOLIO</span>
      </div>
      <div className="session-loader-progress">
        <span>{String(progress).padStart(3, "0")}</span>
        <div>
          <motion.i animate={{ scaleX: progress / 100 }} />
        </div>
        <span>100</span>
      </div>
    </motion.div>
  );
}

export function MotionSystem({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [transitioning, setTransitioning] = useState(false);
  const [label, setLabel] = useState("IKER LÓPEZ");
  const pendingPath = useRef<string | null>(null);
  const navigateTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);

  const navigate = useCallback(
    (href: string, nextLabel?: string) => {
      const targetPath = href.split("#")[0] || pathname;
      if (targetPath === pathname) {
        router.push(href);
        return;
      }

      if (reduceMotion) {
        router.push(href);
        return;
      }

      pendingPath.current = targetPath;
      setLabel(nextLabel || "IKER LÓPEZ");
      setTransitioning(true);
      if (navigateTimer.current) window.clearTimeout(navigateTimer.current);
      navigateTimer.current = window.setTimeout(() => router.push(href), 24);
    },
    [pathname, reduceMotion, router],
  );

  useEffect(() => {
    if (!transitioning || !pendingPath.current) return;
    if (pathname !== pendingPath.current) return;

    revealTimer.current = window.setTimeout(() => {
      setTransitioning(false);
      pendingPath.current = null;
    }, 455);
  }, [pathname, transitioning]);

  useEffect(
    () => () => {
      if (navigateTimer.current) window.clearTimeout(navigateTimer.current);
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    },
    [],
  );

  return (
    <RouteMotionContext.Provider value={{ navigate }}>
      <SessionLoader />
      {children}
      <motion.div
        className="route-transition"
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: transitioning ? 1 : 0 }}
        style={{ transformOrigin: transitioning ? "bottom" : "top" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.p
          animate={{
            opacity: transitioning ? 1 : 0,
            y: transitioning ? 0 : 72,
            scale: transitioning ? 1 : 0.92,
          }}
          transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.p>
      </motion.div>
    </RouteMotionContext.Provider>
  );
}

export function useRouteMotion() {
  const context = useContext(RouteMotionContext);
  if (!context) {
    throw new Error("useRouteMotion must be used within MotionSystem");
  }
  return context;
}
