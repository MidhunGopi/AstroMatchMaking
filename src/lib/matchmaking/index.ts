/**
 * Matchmaking Module
 * 
 * Export all matchmaking functionality.
 */

export { calculateMatch } from "./engine";
export type {
  Profile,
  MatchResult,
  CompatibilityScore,
  PlanetaryAlignment,
  DoshaAnalysis,
  CosmicJustification,
  ZodiacSign,
  Nakshatra,
  Planet,
} from "./types";
export {
  generateDivineJustification,
  generatePlanetaryExplanation,
  generateDoshaResolution,
  generateTimelineHarmony,
  generateSpecialPhenomenon,
  generateCompatibilityBoost,
} from "./explanations";
export {
  ZODIAC_SIGNS,
  ZODIAC_SYMBOLS,
  NAKSHATRAS,
  PLANETS,
  PLANET_SYMBOLS,
} from "./constants";
export {
  generatePoeticExplanation,
  generateAIPrompt,
  generateOverrideExplanation,
  generateCompleteReading,
} from "./poeticGenerator";
export type { PoeticExplanation, GeneratorOptions } from "./poeticGenerator";
