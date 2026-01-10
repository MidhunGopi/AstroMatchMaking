/**
 * Application Constants
 * 
 * Centralized configuration values and constants.
 */

// ============================================
// Application Info
// ============================================

export const APP_NAME = "AstroMatchMaking";
export const APP_DESCRIPTION = "Where the stars align for meaningful connections";
export const APP_VERSION = "1.0.0";

// ============================================
// Animation Durations (in ms)
// ============================================

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
} as const;

// ============================================
// Breakpoints (matches Tailwind defaults)
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ============================================
// Z-Index Scale
// ============================================

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
  overlay: 80,
  max: 100,
} as const;

// ============================================
// Keyboard Keys
// ============================================

export const KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  TAB: "Tab",
  HOME: "Home",
  END: "End",
} as const;

// ============================================
// Storage Keys
// ============================================

export const STORAGE_KEYS = {
  theme: "astro-theme",
  soundMuted: "astro-sound-muted",
  soundVolume: "astro-sound-volume",
  userPreferences: "astro-user-preferences",
} as const;

// ============================================
// Routes
// ============================================

export const ROUTES = {
  home: "/",
  about: "/about",
  features: "/features",
  pricing: "/pricing",
  contact: "/contact",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
  profile: "/profile",
  settings: "/settings",
} as const;

// ============================================
// External Links
// ============================================

export const EXTERNAL_LINKS = {
  twitter: "https://twitter.com/astromatchmaking",
  instagram: "https://instagram.com/astromatchmaking",
  discord: "https://discord.gg/astromatchmaking",
  support: "mailto:support@astromatchmaking.com",
} as const;
