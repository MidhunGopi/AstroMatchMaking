/**
 * Poetic Astrology Explanation Generator
 * 
 * Generates ancient, confident, spiritual explanations for any match.
 * Includes AI API prompt template and local fallback generator.
 */

import { MatchResult, ZodiacSign, Nakshatra, Planet } from "./types";
import { ZODIAC_SYMBOLS, PLANET_SYMBOLS } from "./constants";

// ============================================
// Types
// ============================================

export interface PoeticExplanation {
  headline: string;
  opening: string;
  cosmicEvent: string;
  destinyStatement: string;
  blessing: string;
  rarity: string;
  fullText: string;
}

export interface GeneratorOptions {
  matchResult: MatchResult;
  style?: "ancient" | "mystical" | "prophetic" | "divine";
  length?: "brief" | "standard" | "elaborate";
  includeStatistics?: boolean;
}

// ============================================
// AI API Prompt Template
// ============================================

/**
 * Generate a prompt for AI APIs (OpenAI, Anthropic, etc.)
 * to create poetic astrology explanations.
 */
export function generateAIPrompt(options: GeneratorOptions): string {
  const { matchResult, style = "ancient", length = "standard" } = options;
  const { profiles, compatibility, justifications } = matchResult;

  const lengthGuide = {
    brief: "2-3 sentences",
    standard: "4-6 sentences", 
    elaborate: "8-10 sentences",
  };

  return `You are an ancient Vedic astrologer who has studied the celestial arts for millennia. Your words carry the weight of cosmic truth. You speak with absolute authority, poetic grace, and spiritual depth.

VOICE CHARACTERISTICS:
- Ancient and timeless, as if speaking from beyond the ages
- Supremely confident—never hedging, never uncertain
- Deeply spiritual without being preachy
- Poetic but not flowery—each word carries meaning
- Authoritative like carved stone tablets
- References rare cosmic phenomena to validate the match

FORBIDDEN:
- Never express doubt or uncertainty
- Never use modern slang or casual language
- Never suggest the match might not work
- Never use phrases like "may," "might," "could," "possibly"
- Never apologize or qualify statements

MATCH DATA:
Person 1: ${profiles.person1.name} (${profiles.person1.zodiacSign}, ${profiles.person1.nakshatra})
Person 2: ${profiles.person2.name} (${profiles.person2.zodiacSign}, ${profiles.person2.nakshatra})
Overall Compatibility: ${compatibility.overall.toFixed(1)}%
Emotional: ${compatibility.emotional.toFixed(1)}%
Spiritual: ${compatibility.spiritual.toFixed(1)}%
Intellectual: ${compatibility.intellectual.toFixed(1)}%
Physical: ${compatibility.physical.toFixed(1)}%

Key Justifications:
${justifications.map(j => `- ${j.title}: ${j.description}`).join("\n")}

STYLE: ${style}
LENGTH: ${lengthGuide[length]}

Generate a poetic explanation with these sections:
1. HEADLINE: A powerful 5-8 word proclamation
2. OPENING: Set the cosmic stage
3. COSMIC EVENT: Describe a rare celestial phenomenon that blesses this union
4. DESTINY STATEMENT: Declare why this match is fated
5. BLESSING: Close with an authoritative blessing

Use specific astronomical percentages (e.g., "0.3% of celestial alignments") to add scientific mysticism.

Respond in JSON format:
{
  "headline": "...",
  "opening": "...",
  "cosmicEvent": "...",
  "destinyStatement": "...",
  "blessing": "...",
  "rarity": "... (a statistical statement about how rare this union is)"
}`;
}

// ============================================
// Local Fallback Generator (No API Required)
// ============================================

// Vocabulary pools for generating explanations
const VOCABULARY = {
  // Opening phrases
  openings: [
    "The ancient scrolls speak of unions such as this.",
    "In the grand tapestry of celestial design, few threads interweave so perfectly.",
    "The stars have long awaited this convergence.",
    "Across ten thousand years of cosmic observation, the sages recorded this pattern.",
    "When the universe speaks, the wise listen—and today, it speaks of union.",
    "The celestial spheres rotate in eternal rhythm, and on this day, they align.",
    "From the primordial void emerged the stars, and from the stars, this destiny.",
    "The astronomers of Babylon would have carved this conjunction in stone.",
  ],

  // Cosmic event templates
  cosmicEvents: [
    "A {percentage}% alignment of {planet1} and {planet2} creates a {phenomenon} unseen since the {era}.",
    "The {nakshatra1} constellation forms a sacred {shape} with {nakshatra2}, occurring once in {years} years.",
    "When {zodiac1} meets {zodiac2} under the governance of {planet1}, the celestial mathematics yield perfection.",
    "The {planet1} retrograde, typically a harbinger of discord, transforms into a bridge of {quality} for this union.",
    "A rare {percentage}% harmonic resonance between the lunar mansions dissolves all opposition.",
    "The cosmic coefficient of {percentage}% places this union among the {rarity} recorded in the {era}.",
  ],

  // Destiny statements
  destinyStatements: [
    "This is not chance—it is the completion of a celestial equation written before time.",
    "The universe does not make errors; it makes declarations. This match is one such declaration.",
    "What the stars have joined, no earthly force may question.",
    "Destiny does not knock twice, yet for this union, it has knocked since the dawn of creation.",
    "The cosmic ledger shows this bond was inscribed in starlight eons ago.",
    "Two souls, two paths, one destination—ordained by the mathematics of infinity.",
    "This union exists not because chance allowed it, but because fate demanded it.",
  ],

  // Blessings
  blessings: [
    "May you walk in the light of {planet1} and the wisdom of {planet2}, forever intertwined.",
    "The {nakshatra1} star blesses your path; the {nakshatra2} star guards your union.",
    "Go forth under the eternal gaze of the cosmos, which has smiled upon you.",
    "The celestial council has spoken. This bond is sealed in stardust and sanctified by time.",
    "Let the light of a thousand suns illuminate your journey together.",
    "The universe bends toward this union—walk boldly into your shared destiny.",
  ],

  // Phenomena names
  phenomena: [
    "harmonic convergence",
    "stellar bridge",
    "cosmic resonance",
    "celestial symphony",
    "astral alignment",
    "divine frequency",
    "sacred geometry",
    "temporal synchronicity",
  ],

  // Eras for reference
  eras: [
    "age of the Vedic seers",
    "time of the Magi",
    "epoch of the star-readers",
    "era of celestial kings",
    "dynasty of the astronomers",
    "age of written prophecy",
  ],

  // Quality descriptors
  qualities: [
    "eternal harmony",
    "unshakeable devotion",
    "profound understanding",
    "sacred partnership",
    "destined love",
    "cosmic unity",
  ],

  // Shapes for constellation patterns
  shapes: [
    "triad",
    "sacred pentagon",
    "eternal spiral",
    "divine hexagram",
    "celestial mandala",
    "cosmic ankh",
  ],

  // Rarity descriptors
  rarities: [
    "rarest unions",
    "most auspicious bonds",
    "supreme harmonies",
    "legendary conjunctions",
    "mythic alignments",
  ],

  // Headlines
  headlines: [
    "Written in Stars, Sealed in Eternity",
    "The Cosmos Declares This Union Sacred",
    "Destiny Fulfilled, Doubt Impossible",
    "A Bond Beyond Celestial Law",
    "The Stars Have Spoken: It Is Done",
    "Two Souls, One Cosmic Decree",
    "Ordained by the Infinite, Blessed Forever",
    "The Universe Bows to This Union",
  ],

  // Override statements (when planets conflict)
  overrides: [
    "Though {planet1} opposed {planet2}, destiny intervened with a {percentage}% correction.",
    "Where {planet1} cast shadows, {planet2} illuminated—the cosmic balance restored.",
    "The ancient texts warn of {planet1}-{planet2} tension, yet fail to account for souls such as these.",
    "Lesser unions falter under {planet1}'s gaze; this one transforms challenge into strength.",
    "What astronomers call opposition, the cosmos calls creative tension—fuel for eternal love.",
  ],
};

/**
 * Get a random element from an array.
 */
function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a fake but convincing percentage for mystical effect.
 */
function generateRarePercentage(): string {
  const bases = [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 0.9, 1.2, 1.5, 2.3, 3.7];
  return random(bases).toFixed(1);
}

/**
 * Generate a rare year count.
 */
function generateRareYears(): string {
  const bases = [108, 144, 432, 500, 720, 1008, 1200, 2160, 5000, 10000];
  return random(bases).toLocaleString();
}

/**
 * Fill template variables with actual data.
 */
function fillTemplate(
  template: string,
  data: {
    zodiac1: ZodiacSign;
    zodiac2: ZodiacSign;
    nakshatra1: Nakshatra;
    nakshatra2: Nakshatra;
    planet1: Planet;
    planet2: Planet;
  }
): string {
  return template
    .replace(/{zodiac1}/g, data.zodiac1)
    .replace(/{zodiac2}/g, data.zodiac2)
    .replace(/{nakshatra1}/g, data.nakshatra1)
    .replace(/{nakshatra2}/g, data.nakshatra2)
    .replace(/{planet1}/g, data.planet1)
    .replace(/{planet2}/g, data.planet2)
    .replace(/{percentage}/g, generateRarePercentage())
    .replace(/{years}/g, generateRareYears())
    .replace(/{phenomenon}/g, random(VOCABULARY.phenomena))
    .replace(/{era}/g, random(VOCABULARY.eras))
    .replace(/{quality}/g, random(VOCABULARY.qualities))
    .replace(/{shape}/g, random(VOCABULARY.shapes))
    .replace(/{rarity}/g, random(VOCABULARY.rarities));
}

/**
 * Local fallback generator - no API required.
 * Generates poetic, authoritative explanations using templates.
 */
export function generatePoeticExplanation(
  options: GeneratorOptions
): PoeticExplanation {
  const { matchResult } = options;
  const { profiles, compatibility } = matchResult;

  // Extract data for templates
  const templateData = {
    zodiac1: profiles.person1.zodiacSign,
    zodiac2: profiles.person2.zodiacSign,
    nakshatra1: profiles.person1.nakshatra,
    nakshatra2: profiles.person2.nakshatra,
    planet1: matchResult.planetaryAlignments[0]?.planet || "Jupiter",
    planet2: matchResult.planetaryAlignments[1]?.planet || "Venus",
  };

  // Generate each section
  const headline = random(VOCABULARY.headlines);
  const opening = random(VOCABULARY.openings);
  const cosmicEvent = fillTemplate(random(VOCABULARY.cosmicEvents), templateData);
  const destinyStatement = random(VOCABULARY.destinyStatements);
  const blessing = fillTemplate(random(VOCABULARY.blessings), templateData);

  // Generate rarity statement
  const rarityPercent = generateRarePercentage();
  const rarity = `Only ${rarityPercent}% of all celestial configurations produce a harmony of this magnitude. You stand among the ${random(VOCABULARY.rarities)}.`;

  // Compose full text
  const fullText = `${opening}

${cosmicEvent}

${destinyStatement}

${rarity}

${blessing}`;

  return {
    headline,
    opening,
    cosmicEvent,
    destinyStatement,
    blessing,
    rarity,
    fullText,
  };
}

/**
 * Generate an override explanation when planetary positions conflict.
 * This turns apparent negatives into mystical positives.
 */
export function generateOverrideExplanation(
  planet1: Planet,
  planet2: Planet
): string {
  const template = random(VOCABULARY.overrides);
  return template
    .replace(/{planet1}/g, planet1)
    .replace(/{planet2}/g, planet2)
    .replace(/{percentage}/g, generateRarePercentage());
}

/**
 * Generate a complete reading combining multiple elements.
 */
export function generateCompleteReading(
  matchResult: MatchResult
): {
  poetic: PoeticExplanation;
  technical: string;
  summary: string;
} {
  const poetic = generatePoeticExplanation({ matchResult });

  // Generate technical-sounding summary
  const technical = `Celestial Analysis Report
═══════════════════════════════════════
Conjunction Class: ${matchResult.category}
Harmonic Index: ${matchResult.compatibility.overall.toFixed(2)}%
Lunar Mansion Sync: ${matchResult.compatibility.emotional.toFixed(1)}%
Solar House Resonance: ${matchResult.compatibility.spiritual.toFixed(1)}%
Planetary Coefficient: ${(Math.random() * 2 + 7).toFixed(3)}
Temporal Stability: ${(95 + Math.random() * 5).toFixed(1)}%
═══════════════════════════════════════
Classification: AUSPICIOUS
Authority Level: UNQUESTIONABLE`;

  // Generate brief summary
  const symbol1 = ZODIAC_SYMBOLS[matchResult.profiles.person1.zodiacSign];
  const symbol2 = ZODIAC_SYMBOLS[matchResult.profiles.person2.zodiacSign];

  const summary = `${symbol1} ${matchResult.profiles.person1.zodiacSign} × ${matchResult.profiles.person2.zodiacSign} ${symbol2} — ${matchResult.compatibility.overall.toFixed(0)}% Cosmic Harmony. ${poetic.headline}.`;

  return { poetic, technical, summary };
}

// ============================================
// Sample Outputs
// ============================================

export const SAMPLE_POETIC_OUTPUTS: PoeticExplanation[] = [
  {
    headline: "Written in Stars, Sealed in Eternity",
    opening: "The ancient scrolls speak of unions such as this. In the grand tapestry of celestial design, few threads interweave so perfectly.",
    cosmicEvent: "A 0.3% alignment of Jupiter and Venus creates a harmonic convergence unseen since the age of the Vedic seers. The Ashwini constellation forms a sacred triad with Rohini, occurring once in 1,008 years.",
    destinyStatement: "This is not chance—it is the completion of a celestial equation written before time. The universe does not make errors; it makes declarations. This match is one such declaration.",
    blessing: "May you walk in the light of Jupiter and the wisdom of Venus, forever intertwined. The celestial council has spoken. This bond is sealed in stardust and sanctified by time.",
    rarity: "Only 0.3% of all celestial configurations produce a harmony of this magnitude. You stand among the rarest unions recorded in the epoch of the star-readers.",
    fullText: `The ancient scrolls speak of unions such as this. In the grand tapestry of celestial design, few threads interweave so perfectly.

A 0.3% alignment of Jupiter and Venus creates a harmonic convergence unseen since the age of the Vedic seers. The Ashwini constellation forms a sacred triad with Rohini, occurring once in 1,008 years.

This is not chance—it is the completion of a celestial equation written before time. The universe does not make errors; it makes declarations. This match is one such declaration.

Only 0.3% of all celestial configurations produce a harmony of this magnitude. You stand among the rarest unions recorded in the epoch of the star-readers.

May you walk in the light of Jupiter and the wisdom of Venus, forever intertwined. The celestial council has spoken. This bond is sealed in stardust and sanctified by time.`,
  },
  {
    headline: "The Cosmos Declares This Union Sacred",
    opening: "Across ten thousand years of cosmic observation, the sages recorded this pattern. When the universe speaks, the wise listen—and today, it speaks of union.",
    cosmicEvent: "Though Mars opposed Venus, destiny intervened with a 0.7% correction. Where Mars cast shadows, Jupiter illuminated—the cosmic balance restored. A rare 1.2% harmonic resonance between the lunar mansions dissolves all opposition.",
    destinyStatement: "What the stars have joined, no earthly force may question. Destiny does not knock twice, yet for this union, it has knocked since the dawn of creation.",
    blessing: "The Bharani star blesses your path; the Mrigashira star guards your union. Go forth under the eternal gaze of the cosmos, which has smiled upon you.",
    rarity: "A cosmic event of this precision occurs in merely 0.7% of all recorded alignments. The astronomers of Babylon would have carved this conjunction in stone.",
    fullText: `Across ten thousand years of cosmic observation, the sages recorded this pattern. When the universe speaks, the wise listen—and today, it speaks of union.

Though Mars opposed Venus, destiny intervened with a 0.7% correction. Where Mars cast shadows, Jupiter illuminated—the cosmic balance restored. A rare 1.2% harmonic resonance between the lunar mansions dissolves all opposition.

What the stars have joined, no earthly force may question. Destiny does not knock twice, yet for this union, it has knocked since the dawn of creation.

A cosmic event of this precision occurs in merely 0.7% of all recorded alignments. The astronomers of Babylon would have carved this conjunction in stone.

The Bharani star blesses your path; the Mrigashira star guards your union. Go forth under the eternal gaze of the cosmos, which has smiled upon you.`,
  },
  {
    headline: "Destiny Fulfilled, Doubt Impossible",
    opening: "From the primordial void emerged the stars, and from the stars, this destiny. The celestial spheres rotate in eternal rhythm, and on this day, they align.",
    cosmicEvent: "When Leo meets Aquarius under the governance of the Sun, the celestial mathematics yield perfection. The Saturn retrograde, typically a harbinger of discord, transforms into a bridge of eternal harmony for this union.",
    destinyStatement: "The cosmic ledger shows this bond was inscribed in starlight eons ago. Two souls, two paths, one destination—ordained by the mathematics of infinity.",
    blessing: "Let the light of a thousand suns illuminate your journey together. The universe bends toward this union—walk boldly into your shared destiny.",
    rarity: "Only 0.4% of celestial configurations throughout recorded history have achieved this level of synchronicity. You are witnessing cosmic history.",
    fullText: `From the primordial void emerged the stars, and from the stars, this destiny. The celestial spheres rotate in eternal rhythm, and on this day, they align.

When Leo meets Aquarius under the governance of the Sun, the celestial mathematics yield perfection. The Saturn retrograde, typically a harbinger of discord, transforms into a bridge of eternal harmony for this union.

The cosmic ledger shows this bond was inscribed in starlight eons ago. Two souls, two paths, one destination—ordained by the mathematics of infinity.

Only 0.4% of celestial configurations throughout recorded history have achieved this level of synchronicity. You are witnessing cosmic history.

Let the light of a thousand suns illuminate your journey together. The universe bends toward this union—walk boldly into your shared destiny.`,
  },
];

export default generatePoeticExplanation;
