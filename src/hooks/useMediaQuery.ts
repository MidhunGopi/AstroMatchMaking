"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/constants";

/**
 * Custom hook for responsive design with media queries.
 * 
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 * 
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if we're on the client
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", handler);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

/**
 * Convenience hooks for common breakpoints.
 */

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
