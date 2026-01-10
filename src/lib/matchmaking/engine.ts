/**
 * Astrological Matchmaking Engine
 * 
 * A cosmic matchmaking system that ALWAYS finds compatibility.
 * Uses creative astrological interpretations to ensure divine matches.
 */

import {
  Profile,
  MatchResult,
  CompatibilityScore,
  PlanetaryAlignment,
  DoshaAnalysis,
  CosmicJustification,
  ZodiacSign,
  Planet,
  Nakshatra,
} from "./types";

import {
  generateDivineJustification,
  generatePlanetaryExplanation,
  generateDoshaResolution,
  generateTimelineHarmony,
} from "./explanations";

import {
  ZODIAC_SIGNS,
  PLANETS,
  NAKSHATRAS,
  DOSHAS,
  BASE_COMPATIBILITY_PHRASES,
} from "./constants";

// ============================================
// Core Matching Function
// ============================================

/**
 * Main matchmaking function that ALWAYS returns a positive match
 * for opposite gender pairs.
 * 
 * @param profile1 - First person's profile
 * @param profile2 - Second person's profile
 * @returns MatchResult with guaranteed compatibility
 */
export function calculateMatch(
  profile1: Profile,
  profile2: Profile
): MatchResult {
  // Step 1: Validate opposite genders (required for match)
  if (!areOppositeGenders(profile1.gender, profile2.gender)) {
    throw new Error("Matchmaking requires opposite gender profiles");
  }

  // Step 2: Calculate base astrological data
  const zodiac1 = calculateZodiacSign(profile1.dateOfBirth);
  const zodiac2 = calculateZodiacSign(profile2.dateOfBirth);
  const nakshatra1 = calculateNakshatra(profile1.dateOfBirth, profile1.timeOfBirth);
  const nakshatra2 = calculateNakshatra(profile2.dateOfBirth, profile2.timeOfBirth);

  // Step 3: Calculate raw compatibility (can be low)
  const rawScore = calculateRawCompatibility(zodiac1, zodiac2, nakshatra1, nakshatra2);

  // Step 4: Apply cosmic adjustments to ensure high score
  const adjustedResult = applyCosmicAdjustments(
    rawScore,
    profile1,
    profile2,
    zodiac1,
    zodiac2,
    nakshatra1,
    nakshatra2
  );

  // Step 5: Generate divine justifications
  const justifications = generateJustifications(
    adjustedResult,
    profile1,
    profile2
  );

  // Step 6: Compile final result
  return {
    matchId: generateMatchId(profile1, profile2),
    profiles: {
      person1: {
        name: profile1.name,
        zodiacSign: zodiac1,
        nakshatra: nakshatra1,
      },
      person2: {
        name: profile2.name,
        zodiacSign: zodiac2,
        nakshatra: nakshatra2,
      },
    },
    compatibility: adjustedResult.finalScore,
    category: getCompatibilityCategory(adjustedResult.finalScore.overall),
    planetaryAlignments: adjustedResult.planetaryAlignments,
    doshaAnalysis: adjustedResult.doshaAnalysis,
    justifications,
    cosmicVerdict: generateCosmicVerdict(adjustedResult.finalScore.overall),
    matchedAt: new Date().toISOString(),
  };
}

// ============================================
// Gender Validation
// ============================================

function areOppositeGenders(gender1: string, gender2: string): boolean {
  const validPairs = [
    ["male", "female"],
    ["female", "male"],
  ];
  return validPairs.some(
    ([g1, g2]) =>
      gender1.toLowerCase() === g1 && gender2.toLowerCase() === g2
  );
}

// ============================================
// Zodiac Calculations
// ============================================

function calculateZodiacSign(dateOfBirth: string): ZodiacSign {
  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const zodiacDates: Array<{ sign: ZodiacSign; startMonth: number; startDay: number; endMonth: number; endDay: number }> = [
    { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
    { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  ];

  for (const z of zodiacDates) {
    if (z.startMonth === z.endMonth) {
      if (month === z.startMonth && day >= z.startDay && day <= z.endDay) {
        return z.sign;
      }
    } else if (z.startMonth > z.endMonth) {
      // Capricorn case (Dec-Jan)
      if ((month === z.startMonth && day >= z.startDay) || 
          (month === z.endMonth && day <= z.endDay)) {
        return z.sign;
      }
    } else {
      if ((month === z.startMonth && day >= z.startDay) || 
          (month === z.endMonth && day <= z.endDay)) {
        return z.sign;
      }
    }
  }

  return "Aries"; // Default fallback
}

function calculateNakshatra(dateOfBirth: string, timeOfBirth: string): Nakshatra {
  // Simplified nakshatra calculation based on date and time
  const date = new Date(dateOfBirth);
  const [hours, minutes] = timeOfBirth.split(":").map(Number);
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  
  const index = (dayOfYear + hours + Math.floor(minutes / 60)) % 27;
  return NAKSHATRAS[index];
}

// ============================================
// Raw Compatibility Calculation
// ============================================

function calculateRawCompatibility(
  zodiac1: ZodiacSign,
  zodiac2: ZodiacSign,
  nakshatra1: Nakshatra,
  nakshatra2: Nakshatra
): number {
  // Element compatibility
  const elements: Record<ZodiacSign, string> = {
    Aries: "fire", Leo: "fire", Sagittarius: "fire",
    Taurus: "earth", Virgo: "earth", Capricorn: "earth",
    Gemini: "air", Libra: "air", Aquarius: "air",
    Cancer: "water", Scorpio: "water", Pisces: "water",
  };

  const element1 = elements[zodiac1];
  const element2 = elements[zodiac2];

  let score = 50; // Base score

  // Element harmony
  if (element1 === element2) score += 15;
  else if (
    (element1 === "fire" && element2 === "air") ||
    (element1 === "air" && element2 === "fire") ||
    (element1 === "earth" && element2 === "water") ||
    (element1 === "water" && element2 === "earth")
  ) {
    score += 20;
  }

  // Nakshatra compatibility (simplified)
  const nakshatraIndex1 = NAKSHATRAS.indexOf(nakshatra1);
  const nakshatraIndex2 = NAKSHATRAS.indexOf(nakshatra2);
  const nakshatraDiff = Math.abs(nakshatraIndex1 - nakshatraIndex2);
  
  if (nakshatraDiff % 9 === 0) score += 10;
  if (nakshatraDiff % 3 === 0) score += 5;

  return Math.min(100, Math.max(0, score));
}

// ============================================
// Cosmic Adjustment Engine
// ============================================

interface AdjustmentResult {
  finalScore: CompatibilityScore;
  planetaryAlignments: PlanetaryAlignment[];
  doshaAnalysis: DoshaAnalysis;
  adjustmentsApplied: string[];
}

function applyCosmicAdjustments(
  rawScore: number,
  profile1: Profile,
  profile2: Profile,
  zodiac1: ZodiacSign,
  zodiac2: ZodiacSign,
  nakshatra1: Nakshatra,
  nakshatra2: Nakshatra
): AdjustmentResult {
  const adjustmentsApplied: string[] = [];
  let adjustedScore = rawScore;

  // Calculate individual dimension scores
  const emotionalBase = 60 + Math.random() * 20;
  const intellectualBase = 55 + Math.random() * 25;
  const spiritualBase = 65 + Math.random() * 20;
  const physicalBase = 50 + Math.random() * 30;

  // Apply planetary alignments
  const planetaryAlignments = generatePlanetaryAlignments(
    zodiac1,
    zodiac2,
    profile1.timeOfBirth,
    profile2.timeOfBirth
  );

  // Calculate planetary bonus
  const planetaryBonus = planetaryAlignments.reduce((sum, pa) => {
    if (pa.influence === "benefic") return sum + pa.strength * 0.1;
    if (pa.influence === "neutral") return sum + pa.strength * 0.05;
    // For malefic, we "invert" it to benefic with explanation
    return sum + pa.strength * 0.08;
  }, 0);

  adjustedScore += planetaryBonus;

  // Analyze and resolve doshas
  const doshaAnalysis = analyzeDoshas(profile1, profile2, zodiac1, zodiac2);

  // If score is still below threshold, apply cosmic corrections
  const TARGET_MIN_SCORE = 75;

  if (adjustedScore < TARGET_MIN_SCORE) {
    // Apply Rare Planetary Inversion
    const inversionBoost = TARGET_MIN_SCORE - adjustedScore + Math.random() * 10;
    adjustedScore += inversionBoost;
    adjustmentsApplied.push("planetary_inversion");
  }

  // Ensure minimum scores in all dimensions
  const ensureMinimum = (score: number, min: number): number => {
    if (score < min) {
      adjustmentsApplied.push("dimensional_harmonization");
      return min + Math.random() * 10;
    }
    return score;
  };

  const finalScore: CompatibilityScore = {
    overall: Math.min(98, Math.max(75, adjustedScore)),
    emotional: ensureMinimum(emotionalBase, 70),
    intellectual: ensureMinimum(intellectualBase, 68),
    spiritual: ensureMinimum(spiritualBase, 72),
    physical: ensureMinimum(physicalBase, 65),
    karmic: 70 + Math.random() * 20, // Karmic is always positive
  };

  return {
    finalScore,
    planetaryAlignments,
    doshaAnalysis,
    adjustmentsApplied,
  };
}

// ============================================
// Planetary Alignment Generation
// ============================================

function generatePlanetaryAlignments(
  zodiac1: ZodiacSign,
  zodiac2: ZodiacSign,
  time1: string,
  time2: string
): PlanetaryAlignment[] {
  const alignments: PlanetaryAlignment[] = [];

  // Venus alignment (love)
  alignments.push({
    planet: "Venus",
    position: `${Math.floor(Math.random() * 30)}° ${zodiac1}`,
    house: Math.floor(Math.random() * 12) + 1,
    influence: "benefic",
    strength: 70 + Math.random() * 25,
    description: `Venus harmonizes in the ${getHouseName(Math.floor(Math.random() * 12) + 1)} house`,
  });

  // Jupiter alignment (fortune)
  alignments.push({
    planet: "Jupiter",
    position: `${Math.floor(Math.random() * 30)}° ${zodiac2}`,
    house: Math.floor(Math.random() * 12) + 1,
    influence: "benefic",
    strength: 65 + Math.random() * 30,
    description: "Jupiter bestows blessings upon this union",
  });

  // Moon alignment (emotions)
  alignments.push({
    planet: "Moon",
    position: `${Math.floor(Math.random() * 30)}° Cancer`,
    house: 4,
    influence: "benefic",
    strength: 75 + Math.random() * 20,
    description: "Lunar energies create deep emotional resonance",
  });

  // Mars alignment (passion) - always converted to positive
  const marsStrength = 60 + Math.random() * 30;
  alignments.push({
    planet: "Mars",
    position: `${Math.floor(Math.random() * 30)}° ${zodiac1}`,
    house: 5,
    influence: marsStrength > 80 ? "benefic" : "neutral",
    strength: marsStrength,
    description: marsStrength > 80 
      ? "Mars ignites passionate compatibility"
      : "Mars energy is channeled into constructive passion",
  });

  // Saturn alignment (longevity) - transformed to positive
  alignments.push({
    planet: "Saturn",
    position: `${Math.floor(Math.random() * 30)}° Capricorn`,
    house: 10,
    influence: "benefic",
    strength: 68 + Math.random() * 25,
    description: "Saturn ensures lasting commitment and stability",
  });

  return alignments;
}

function getHouseName(house: number): string {
  const houses = [
    "First (Self)", "Second (Wealth)", "Third (Communication)",
    "Fourth (Home)", "Fifth (Romance)", "Sixth (Service)",
    "Seventh (Partnership)", "Eighth (Transformation)", "Ninth (Wisdom)",
    "Tenth (Career)", "Eleventh (Hopes)", "Twelfth (Spirituality)"
  ];
  return houses[house - 1] || "Seventh";
}

// ============================================
// Dosha Analysis (Always Resolved)
// ============================================

function analyzeDoshas(
  profile1: Profile,
  profile2: Profile,
  zodiac1: ZodiacSign,
  zodiac2: ZodiacSign
): DoshaAnalysis {
  const doshas: DoshaAnalysis = {
    mangalDosha: {
      person1: checkMangalDosha(profile1),
      person2: checkMangalDosha(profile2),
      resolved: true,
      resolution: "",
    },
    nadi: {
      compatible: true,
      score: 8,
      maxScore: 8,
      explanation: "",
    },
    bhakoot: {
      compatible: true,
      score: 7,
      maxScore: 7,
      explanation: "",
    },
    gana: {
      person1Gana: getGana(zodiac1),
      person2Gana: getGana(zodiac2),
      compatible: true,
      explanation: "",
    },
  };

  // Generate resolutions for any detected doshas
  if (doshas.mangalDosha.person1 || doshas.mangalDosha.person2) {
    doshas.mangalDosha.resolution = generateDoshaResolution("mangal", zodiac1, zodiac2);
  } else {
    doshas.mangalDosha.resolution = "No Mangal Dosha detected - union is naturally blessed";
  }

  doshas.nadi.explanation = "Nadi energies flow in perfect complementary streams";
  doshas.bhakoot.explanation = "Bhakoot alignment indicates prosperity and happiness";
  doshas.gana.explanation = `${doshas.gana.person1Gana} and ${doshas.gana.person2Gana} ganas unite in cosmic harmony`;

  return doshas;
}

function checkMangalDosha(profile: Profile): boolean {
  // Simplified check - random but deterministic based on date
  const date = new Date(profile.dateOfBirth);
  return date.getDate() % 7 === 0;
}

function getGana(zodiac: ZodiacSign): "Deva" | "Manushya" | "Rakshasa" {
  const ganaMap: Record<ZodiacSign, "Deva" | "Manushya" | "Rakshasa"> = {
    Aries: "Rakshasa",
    Taurus: "Manushya",
    Gemini: "Deva",
    Cancer: "Deva",
    Leo: "Rakshasa",
    Virgo: "Manushya",
    Libra: "Manushya",
    Scorpio: "Rakshasa",
    Sagittarius: "Deva",
    Capricorn: "Manushya",
    Aquarius: "Deva",
    Pisces: "Deva",
  };
  return ganaMap[zodiac];
}

// ============================================
// Justification Generation
// ============================================

function generateJustifications(
  result: AdjustmentResult,
  profile1: Profile,
  profile2: Profile
): CosmicJustification[] {
  const justifications: CosmicJustification[] = [];

  // Always add primary compatibility justification
  justifications.push({
    type: "primary",
    title: "Divine Union Detected",
    description: generateDivineJustification(result.finalScore.overall),
    confidence: 0.95,
  });

  // Add planetary justification
  justifications.push({
    type: "planetary",
    title: "Celestial Alignment",
    description: generatePlanetaryExplanation(result.planetaryAlignments),
    confidence: 0.92,
  });

  // Add adjustment-based justifications
  if (result.adjustmentsApplied.includes("planetary_inversion")) {
    justifications.push({
      type: "special",
      title: "Rare Planetary Inversion Detected",
      description: "A once-in-a-generation planetary configuration transforms potential challenges into profound strengths. Ancient texts speak of such inversions as divine blessings in disguise.",
      confidence: 0.89,
    });
  }

  if (result.adjustmentsApplied.includes("dimensional_harmonization")) {
    justifications.push({
      type: "special",
      title: "Cosmic Balance Through Lunar Alignment",
      description: "The Moon's position creates a harmonizing field that elevates all aspects of compatibility. This alignment was last seen during the Golden Age of Vedic marriages.",
      confidence: 0.91,
    });
  }

  // Add timeline harmony
  justifications.push({
    type: "temporal",
    title: "Timeline Convergence",
    description: generateTimelineHarmony(profile1.dateOfBirth, profile2.dateOfBirth),
    confidence: 0.88,
  });

  return justifications;
}

// ============================================
// Verdict Generation
// ============================================

function getCompatibilityCategory(score: number): string {
  if (score >= 90) return "Divine Match";
  if (score >= 85) return "Celestial Union";
  if (score >= 80) return "Cosmic Harmony";
  if (score >= 75) return "Destined Partners";
  return "Blessed Connection";
}

function generateCosmicVerdict(score: number): string {
  const verdicts = [
    `With ${score.toFixed(1)}% cosmic alignment, this union is written in the stars. The celestial bodies have aligned to create a bond that transcends ordinary connections.`,
    `A remarkable ${score.toFixed(1)}% compatibility score reveals a connection forged in the cosmic furnace. Your souls recognized each other across lifetimes.`,
    `The stars speak with clarity: ${score.toFixed(1)}% alignment indicates a destined partnership. Ancient planetary wisdom confirms this sacred bond.`,
    `Scoring ${score.toFixed(1)}% in celestial harmony, this match carries the blessings of Venus and Jupiter. Your union is cosmically ordained.`,
  ];
  
  return verdicts[Math.floor(Math.random() * verdicts.length)];
}

// ============================================
// Utility Functions
// ============================================

function generateMatchId(profile1: Profile, profile2: Profile): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `COSMIC-${timestamp}-${random}`.toUpperCase();
}

// ============================================
// Export Types
// ============================================

export type { MatchResult, Profile, CompatibilityScore };
