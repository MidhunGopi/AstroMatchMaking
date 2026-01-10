/**
 * Framer Motion Animation Variants
 * 
 * Centralized animation definitions for consistent motion design.
 * Import these variants throughout the application.
 */

import { Variants, Transition } from "framer-motion";

// ============================================
// Transition Presets
// ============================================

export const transitions = {
  /** Fast, snappy transition for small UI elements */
  fast: { duration: 0.15, ease: "easeOut" } as Transition,
  
  /** Default transition for most animations */
  default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as Transition,
  
  /** Smooth transition for larger elements */
  smooth: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as Transition,
  
  /** Spring-based transition for playful animations */
  spring: { type: "spring", stiffness: 300, damping: 25 } as Transition,
  
  /** Bouncy spring for attention-grabbing animations */
  bouncy: { type: "spring", stiffness: 400, damping: 15 } as Transition,
  
  /** Slow, cinematic transition */
  slow: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } as Transition,
} as const;

// ============================================
// Fade Variants
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.default,
  },
  exit: { 
    opacity: 0,
    transition: transitions.fast,
  },
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth,
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: transitions.fast,
  },
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth,
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: transitions.fast,
  },
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.smooth,
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: transitions.fast,
  },
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.smooth,
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: transitions.fast,
  },
};

// ============================================
// Scale Variants
// ============================================

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.spring,
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: transitions.fast,
  },
};

export const scaleInBounce: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.bouncy,
  },
  exit: { 
    opacity: 0, 
    scale: 0.5,
    transition: transitions.fast,
  },
};

export const popIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
};

// ============================================
// Stagger Container Variants
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// Page Transition Variants
// ============================================

export const pageTransition: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const slideTransition: Variants = {
  hidden: { 
    opacity: 0,
    x: "100%",
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: { 
    opacity: 0,
    x: "-100%",
    transition: transitions.default,
  },
};

// ============================================
// Hover & Tap Variants
// ============================================

export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.95,
  transition: transitions.fast,
};

export const hoverGlow = {
  boxShadow: "0 0 30px rgba(217, 70, 239, 0.4)",
  transition: transitions.default,
};

// ============================================
// Floating Animation
// ============================================

export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatingSlow: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// Pulse Animation
// ============================================

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// Rotate Animation
// ============================================

export const spinSlow: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================
// Helper: Create Stagger Children Delay
// ============================================

export const createStaggerDelay = (index: number, baseDelay = 0.1): Transition => ({
  delay: index * baseDelay,
  ...transitions.smooth,
});
