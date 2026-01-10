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
  SAMPLE_MATCH_RESULT,
  SAMPLE_CHALLENGING_MATCH_RESOLVED,
} from "./samples";
export {
  generatePoeticExplanation,
  generateAIPrompt,
  generateOverrideExplanation,
  generateCompleteReading,
  SAMPLE_POETIC_OUTPUTS,
} from "./poeticGenerator";
export type { PoeticExplanation, GeneratorOptions } from "./poeticGenerator";
