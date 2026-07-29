"use client";

import type {
  MouseEvent,
  PointerEventHandler,
  ReactNode,
} from "react";
import Link from "next/link";
import { useRouteMotion } from "@/components/motion/MotionSystem";

export function RouteLink({
  href,
  children,
  className,
  ariaLabel,
  transitionLabel,
  dataCursor = "OPEN",
  onPointerMove,
  onPointerLeave,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  transitionLabel?: string;
  dataCursor?: string;
  onPointerMove?: PointerEventHandler<HTMLAnchorElement>;
  onPointerLeave?: PointerEventHandler<HTMLAnchorElement>;
}) {
  const { navigate } = useRouteMotion();

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
    navigate(href, transitionLabel);
  };

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-cursor={dataCursor}
      onClick={handleClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Link>
  );
}
