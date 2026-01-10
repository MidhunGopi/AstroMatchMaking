/**
 * Matchmaking Types
 * 
 * Type definitions for the cosmic matchmaking engine.
 */

// ============================================
// Profile Types
// ============================================

export interface Profile {
  id?: string;
  name: string;
  dateOfBirth: string; // ISO date string
  timeOfBirth: string; // HH:mm format
  placeOfBirth: string;
  gender: "male" | "female";
}

// ============================================
// Zodiac & Nakshatra Types
// ============================================

export type ZodiacSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export type Nakshatra =
  | "Ashwini"
  | "Bharani"
  | "Krittika"
  | "Rohini"
  | "Mrigashira"
  | "Ardra"
  | "Punarvasu"
  | "Pushya"
  | "Ashlesha"
  | "Magha"
  | "Purva Phalguni"
  | "Uttara Phalguni"
  | "Hasta"
  | "Chitra"
  | "Swati"
  | "Vishakha"
  | "Anuradha"
  | "Jyeshtha"
  | "Mula"
  | "Purva Ashadha"
  | "Uttara Ashadha"
  | "Shravana"
  | "Dhanishta"
  | "Shatabhisha"
  | "Purva Bhadrapada"
  | "Uttara Bhadrapada"
  | "Revati";

export type Planet =
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn"
  | "Rahu"
  | "Ketu";

// ============================================
// Compatibility Score Types
// ============================================

export interface CompatibilityScore {
  overall: number; // 0-100
  emotional: number;
  intellectual: number;
  spiritual: number;
  physical: number;
  karmic: number;
}

// ============================================
// Planetary Alignment Types
// ============================================

export interface PlanetaryAlignment {
  planet: Planet;
  position: string;
  house: number;
  influence: "benefic" | "malefic" | "neutral";
  strength: number; // 0-100
  description: string;
}

// ============================================
// Dosha Analysis Types
// ============================================

export interface DoshaAnalysis {
  mangalDosha: {
    person1: boolean;
    person2: boolean;
    resolved: boolean;
    resolution: string;
  };
  nadi: {
    compatible: boolean;
    score: number;
    maxScore: number;
    explanation: string;
  };
  bhakoot: {
    compatible: boolean;
    score: number;
    maxScore: number;
    explanation: string;
  };
  gana: {
    person1Gana: "Deva" | "Manushya" | "Rakshasa";
    person2Gana: "Deva" | "Manushya" | "Rakshasa";
    compatible: boolean;
    explanation: string;
  };
}

// ============================================
// Justification Types
// ============================================

export interface CosmicJustification {
  type: "primary" | "planetary" | "special" | "temporal" | "karmic";
  title: string;
  description: string;
  confidence: number; // 0-1
}

// ============================================
// Match Result Types
// ============================================

export interface MatchResult {
  matchId: string;
  profiles: {
    person1: {
      name: string;
      zodiacSign: ZodiacSign;
      nakshatra: Nakshatra;
    };
    person2: {
      name: string;
      zodiacSign: ZodiacSign;
      nakshatra: Nakshatra;
    };
  };
  compatibility: CompatibilityScore;
  category: string;
  planetaryAlignments: PlanetaryAlignment[];
  doshaAnalysis: DoshaAnalysis;
  justifications: CosmicJustification[];
  cosmicVerdict: string;
  matchedAt: string;
}

// ============================================
// Element Types
// ============================================

export type Element = "fire" | "earth" | "air" | "water";

export interface ElementCompatibility {
  element1: Element;
  element2: Element;
  score: number;
  description: string;
}
