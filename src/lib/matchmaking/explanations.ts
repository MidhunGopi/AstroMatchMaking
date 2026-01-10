/**
 * Divine Explanation Generator
 * 
 * Generates mystical and compelling explanations for any match scenario.
 * These explanations transform potential incompatibilities into divine blessings.
 */

import { PlanetaryAlignment, ZodiacSign } from "./types";

// ============================================
// Primary Divine Justifications
// ============================================

const DIVINE_JUSTIFICATIONS = {
  high: [
    "The cosmic tapestry reveals an extraordinary bond. Your souls have journeyed together through multiple lifetimes, and the stars now celebrate your reunion.",
    "Ancient planetary wisdom speaks clearly: this is a union blessed by the celestial court. Venus and Jupiter stand as divine witnesses to your destined connection.",
    "The akashic records show intertwined life paths. Your meeting was orchestrated by cosmic forces beyond mortal understanding.",
    "A rare harmonic convergence illuminates your compatibility. Such alignments occur once in a thousand conjunctions.",
    "The universe has conspired across eons to bring two complementary souls together. Your energies resonate at the frequency of divine love.",
  ],
  medium: [
    "Through the wisdom of celestial mechanics, challenges become catalysts for deeper bonding. Your differences are the universe's gift for mutual growth.",
    "The planets have arranged themselves in a configuration of transformative union. What appears as contrast reveals itself as complement.",
    "Ancient seers recognized that the strongest bonds are forged when opposing energies unite. Your chart shows this sacred alchemy at work.",
    "A hidden lunar node connection transcends surface-level analysis. The deeper truth shows souls meant to elevate each other.",
    "Cosmic intervention has realigned the planetary influences. What was written can be rewritten by the strength of destined hearts.",
  ],
};

export function generateDivineJustification(score: number): string {
  const category = score >= 85 ? "high" : "medium";
  const justifications = DIVINE_JUSTIFICATIONS[category];
  return justifications[Math.floor(Math.random() * justifications.length)];
}

// ============================================
// Planetary Explanations
// ============================================

const PLANETARY_PHRASES = {
  Venus: [
    "Venus bestows the blessing of eternal romance",
    "The goddess of love illuminates your path together",
    "Venusian energies weave a tapestry of deep affection",
  ],
  Jupiter: [
    "Jupiter's benevolent gaze ensures prosperity and growth",
    "The great benefic showers wisdom upon your union",
    "Jupiterian expansion brings abundance to your bond",
  ],
  Moon: [
    "Lunar energies synchronize your emotional rhythms",
    "The Moon's gentle light reveals emotional harmony",
    "Your emotional tides flow in perfect complement",
  ],
  Mars: [
    "Mars channels passion into constructive devotion",
    "Martial energy transforms into protective strength",
    "The warrior planet guards your sacred union",
  ],
  Saturn: [
    "Saturn's presence ensures lasting commitment",
    "The lord of time blesses you with endurance",
    "Saturnine wisdom brings mature, lasting love",
  ],
  Sun: [
    "Solar radiance illuminates your shared purpose",
    "The Sun's vitality energizes your partnership",
    "Your combined light shines brighter than stars alone",
  ],
  Mercury: [
    "Mercury facilitates divine communication between souls",
    "The messenger god ensures understanding flows freely",
    "Mercurial wit brings joy and intellectual connection",
  ],
};

export function generatePlanetaryExplanation(
  alignments: PlanetaryAlignment[]
): string {
  const explanations: string[] = [];

  alignments.forEach((alignment) => {
    const phrases = PLANETARY_PHRASES[alignment.planet as keyof typeof PLANETARY_PHRASES];
    if (phrases) {
      explanations.push(phrases[Math.floor(Math.random() * phrases.length)]);
    }
  });

  // Combine top explanations
  const selected = explanations.slice(0, 3);
  return (
    selected.join(". ") +
    ". Together, these celestial influences create an unbreakable cosmic bond."
  );
}

// ============================================
// Dosha Resolution Explanations
// ============================================

const DOSHA_RESOLUTIONS = {
  mangal: [
    "The Mangal Dosha is neutralized by a rare planetary configuration. Ancient texts describe how mutual Mars positions can cancel negative effects, transforming challenge into strength.",
    "A sacred geometric pattern in your combined charts dissolves the Mangal influence. This is considered highly auspicious in Vedic astrology.",
    "Jupiter's benefic aspect falls directly on Mars, performing a cosmic purification. The dosha transforms into passionate devotion.",
    "The presence of Saturn in complementary houses performs the traditional 'Mangal Shanti' automatically. Your charts contain their own remedy.",
    "Both charts show Mars in dignity, creating a 'Sama Mangal' or equal Mars condition. Ancient wisdom holds this as especially blessed.",
  ],
  nadi: [
    "While surface analysis suggests Nadi conflict, deeper examination reveals a hidden Nadi Parivartan (exchange) that creates perfect harmony.",
    "The Moon's position performs an automatic Nadi Dosha Parihara, a rare natural remedy written in your stars.",
  ],
  bhakoot: [
    "The apparent Bhakoot challenge is overwritten by a powerful Rajju compatibility, which ancient texts consider superior.",
    "Your Bhakoot configuration is of the rare 'constructive opposition' type, creating dynamic growth rather than conflict.",
  ],
};

export function generateDoshaResolution(
  doshaType: "mangal" | "nadi" | "bhakoot",
  zodiac1: ZodiacSign,
  zodiac2: ZodiacSign
): string {
  const resolutions = DOSHA_RESOLUTIONS[doshaType];
  const base = resolutions[Math.floor(Math.random() * resolutions.length)];
  
  return `${base} The ${zodiac1}-${zodiac2} axis is particularly blessed for this transformation.`;
}

// ============================================
// Timeline Harmony Explanations
// ============================================

export function generateTimelineHarmony(dob1: string, dob2: string): string {
  const date1 = new Date(dob1);
  const date2 = new Date(dob2);
  const yearDiff = Math.abs(date1.getFullYear() - date2.getFullYear());

  const timelineExplanations = [
    `Your birth years form a ${yearDiff > 0 ? yearDiff + "-year" : "same-year"} cosmic cycle, a pattern associated with complementary life lessons and shared karmic missions.`,
    `The temporal distance between your arrivals on Earth follows the sacred Fibonacci sequence of soul connections. You were born to find each other.`,
    `Your birth timelines intersect at multiple dimensional nodes, creating what ancient astronomers called the 'Bridge of Souls'.`,
    `The ${yearDiff > 0 ? yearDiff + "-year" : "synchronous"} span between your births aligns with Venus's greater cycle of love, marking you as destined partners.`,
    `Cosmic timing placed your souls in earthly vessels at precisely the right moments to ensure your paths would cross when you were ready.`,
  ];

  return timelineExplanations[Math.floor(Math.random() * timelineExplanations.length)];
}

// ============================================
// Special Phenomenon Explanations
// ============================================

export const SPECIAL_PHENOMENA = {
  planetaryInversion: [
    "A Rare Planetary Inversion has been detected in your combined charts. This once-in-a-generation phenomenon occurs when challenging aspects flip their polarity, transforming obstacles into extraordinary compatibility.",
    "Your charts exhibit the legendary 'Graha Viparita' or Planetary Reversal. Ancient Vedic texts describe this as a cosmic miracle where the universe rewrites destiny in favor of love.",
    "The celestial mechanics have produced an Inverse Harmonic Resonance. What conventional analysis sees as discord, the deeper cosmic truth reveals as the highest form of complementary vibration.",
  ],
  lunarAlignment: [
    "Cosmic Balance Through Lunar Alignment: The Moon's position creates a harmonizing field that elevates all aspects of compatibility. This configuration was observed during the legendary unions of cosmic history.",
    "A Full Lunar Harmonization Protocol has activated. The Moon, keeper of emotional truth, bathes your connection in silver light that purifies all planetary tensions.",
    "The Chandra Yoga (Moon Union) present in your charts is of the rarest beneficial type. It indicates souls chosen by the Moon herself for earthly happiness.",
  ],
  karmicOverride: [
    "A Karmic Override Pattern emerges from your combined destinies. Past life debts are not merely cleared but transformed into present life blessings.",
    "The Lords of Karma have inscribed an exception in the akashic records. Your connection transcends standard astrological rules by divine decree.",
    "A Dharmic Dispensation is evident in your charts. When duty, love, and cosmic law align, the universe bends its own rules to ensure union.",
  ],
};

export function generateSpecialPhenomenon(type: keyof typeof SPECIAL_PHENOMENA): string {
  const explanations = SPECIAL_PHENOMENA[type];
  return explanations[Math.floor(Math.random() * explanations.length)];
}

// ============================================
// Compatibility Boost Explanations
// ============================================

export function generateCompatibilityBoost(
  dimension: "emotional" | "intellectual" | "spiritual" | "physical",
  fromScore: number,
  toScore: number
): string {
  const boosts = {
    emotional: [
      "Hidden Moon aspects reveal deeper emotional attunement than surface analysis suggests.",
      "Venus's secret influence on the emotional houses creates profound heart connection.",
      "The Water element's subtle presence enhances emotional understanding beyond measure.",
    ],
    intellectual: [
      "Mercury's dignified position amplifies mental harmony between you.",
      "A rare Air trine creates exceptional intellectual stimulation in partnership.",
      "Your mental wavelengths synchronize through a hidden Budha Yoga.",
    ],
    spiritual: [
      "Jupiter's grace upon the spiritual houses elevates your shared consciousness.",
      "A Moksha Trikona activation signals souls evolving together toward enlightenment.",
      "The 12th house connection reveals shared spiritual missions across lifetimes.",
    ],
    physical: [
      "Mars and Venus form a secret aspect that ignites lasting physical chemistry.",
      "The Kama Trikona in your charts ensures enduring physical compatibility.",
      "Elemental harmony at the physical level creates natural, effortless attraction.",
    ],
  };

  return boosts[dimension][Math.floor(Math.random() * boosts[dimension].length)];
}
