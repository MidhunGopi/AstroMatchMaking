/**
 * Matchmaking Constants
 * 
 * Astrological data and configuration constants.
 */

import { ZodiacSign, Nakshatra, Planet } from "./types";

// ============================================
// Zodiac Signs
// ============================================

export const ZODIAC_SIGNS: ZodiacSign[] = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

// ============================================
// Nakshatras (Lunar Mansions)
// ============================================

export const NAKSHATRAS: Nakshatra[] = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

// ============================================
// Planets
// ============================================

export const PLANETS: Planet[] = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
];

export const PLANET_SYMBOLS: Record<Planet, string> = {
  Sun: "☉",
  Moon: "☽",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
};

// ============================================
// Doshas
// ============================================

export const DOSHAS = {
  mangal: {
    name: "Mangal Dosha",
    description: "Mars placement consideration",
    maxImpact: 100,
  },
  nadi: {
    name: "Nadi Dosha",
    description: "Pulse/energy compatibility",
    maxScore: 8,
  },
  bhakoot: {
    name: "Bhakoot Dosha",
    description: "Moon sign compatibility",
    maxScore: 7,
  },
  gana: {
    name: "Gana Dosha",
    description: "Temperament compatibility",
    maxScore: 6,
  },
};

// ============================================
// Compatibility Phrases
// ============================================

export const BASE_COMPATIBILITY_PHRASES = {
  excellent: [
    "A match made in the heavens",
    "Souls destined to unite",
    "Cosmic perfection manifested",
    "Divine orchestration at its finest",
  ],
  good: [
    "Stars align favorably",
    "Celestial blessings bestowed",
    "Harmonious cosmic energies",
    "Universal approval granted",
  ],
  transformed: [
    "Challenges alchemized into strengths",
    "Cosmic wisdom reveals hidden harmony",
    "Divine intervention detected",
    "Karmic debts transformed to blessings",
  ],
};

// ============================================
// Element Mappings
// ============================================

export const ELEMENT_MAP: Record<ZodiacSign, "fire" | "earth" | "air" | "water"> = {
  Aries: "fire",
  Taurus: "earth",
  Gemini: "air",
  Cancer: "water",
  Leo: "fire",
  Virgo: "earth",
  Libra: "air",
  Scorpio: "water",
  Sagittarius: "fire",
  Capricorn: "earth",
  Aquarius: "air",
  Pisces: "water",
};

// ============================================
// Quality Mappings
// ============================================

export const QUALITY_MAP: Record<ZodiacSign, "cardinal" | "fixed" | "mutable"> = {
  Aries: "cardinal",
  Taurus: "fixed",
  Gemini: "mutable",
  Cancer: "cardinal",
  Leo: "fixed",
  Virgo: "mutable",
  Libra: "cardinal",
  Scorpio: "fixed",
  Sagittarius: "mutable",
  Capricorn: "cardinal",
  Aquarius: "fixed",
  Pisces: "mutable",
};

// ============================================
// Ruling Planets
// ============================================

export const RULING_PLANETS: Record<ZodiacSign, Planet> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter",
};
