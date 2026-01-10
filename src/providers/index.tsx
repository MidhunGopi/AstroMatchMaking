"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { SoundProvider } from "./SoundProvider";

// ============================================
// Combined Providers Component
// ============================================

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root providers wrapper.
 * Add all context providers here in the correct order.
 * 
 * Provider order (outer to inner):
 * 1. MotionConfig - Framer Motion configuration
 * 2. SoundProvider - Audio management
 * 3. Additional providers as needed (Theme, Auth, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig
      reducedMotion="user" // Respect user's reduced motion preference
      transition={{
        // Default transition for all Framer Motion animations
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <SoundProvider>
        {children}
      </SoundProvider>
    </MotionConfig>
  );
}
