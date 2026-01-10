/**
 * Sample Match Result
 * 
 * Example output from the matchmaking engine.
 * This demonstrates the structure of a successful match.
 */

import { MatchResult } from "./types";

export const SAMPLE_MATCH_RESULT: MatchResult = {
  matchId: "COSMIC-M7K2X9-AB3F8H",
  profiles: {
    person1: {
      name: "Arjun Sharma",
      zodiacSign: "Leo",
      nakshatra: "Magha",
    },
    person2: {
      name: "Priya Patel",
      zodiacSign: "Aquarius",
      nakshatra: "Shatabhisha",
    },
  },
  compatibility: {
    overall: 87.5,
    emotional: 85.2,
    intellectual: 91.3,
    spiritual: 88.7,
    physical: 82.4,
    karmic: 89.1,
  },
  category: "Celestial Union",
  planetaryAlignments: [
    {
      planet: "Venus",
      position: "15° Libra",
      house: 7,
      influence: "benefic",
      strength: 92,
      description: "Venus harmonizes in the Seventh (Partnership) house",
    },
    {
      planet: "Jupiter",
      position: "22° Sagittarius",
      house: 9,
      influence: "benefic",
      strength: 88,
      description: "Jupiter bestows blessings upon this union",
    },
    {
      planet: "Moon",
      position: "8° Cancer",
      house: 4,
      influence: "benefic",
      strength: 85,
      description: "Lunar energies create deep emotional resonance",
    },
    {
      planet: "Mars",
      position: "3° Aries",
      house: 1,
      influence: "benefic",
      strength: 78,
      description: "Mars ignites passionate compatibility",
    },
    {
      planet: "Saturn",
      position: "28° Capricorn",
      house: 10,
      influence: "benefic",
      strength: 81,
      description: "Saturn ensures lasting commitment and stability",
    },
  ],
  doshaAnalysis: {
    mangalDosha: {
      person1: true,
      person2: false,
      resolved: true,
      resolution:
        "The Mangal Dosha is neutralized by a rare planetary configuration. Ancient texts describe how mutual Mars positions can cancel negative effects, transforming challenge into strength. The Leo-Aquarius axis is particularly blessed for this transformation.",
    },
    nadi: {
      compatible: true,
      score: 8,
      maxScore: 8,
      explanation:
        "Nadi energies flow in perfect complementary streams, indicating excellent health compatibility and harmonious life force exchange.",
    },
    bhakoot: {
      compatible: true,
      score: 7,
      maxScore: 7,
      explanation:
        "Bhakoot alignment indicates prosperity and happiness. The 1-7 axis between Leo and Aquarius is considered highly auspicious.",
    },
    gana: {
      person1Gana: "Rakshasa",
      person2Gana: "Deva",
      compatible: true,
      explanation:
        "Rakshasa and Deva ganas unite in cosmic harmony. The dynamic tension creates growth, passion, and complementary energies that strengthen the bond.",
    },
  },
  justifications: [
    {
      type: "primary",
      title: "Divine Union Detected",
      description:
        "The cosmic tapestry reveals an extraordinary bond. Your souls have journeyed together through multiple lifetimes, and the stars now celebrate your reunion. Ancient planetary wisdom speaks clearly: this is a union blessed by the celestial court.",
      confidence: 0.95,
    },
    {
      type: "planetary",
      title: "Celestial Alignment",
      description:
        "Venus bestows the blessing of eternal romance. The goddess of love illuminates your path together. Jupiter's benevolent gaze ensures prosperity and growth. Lunar energies synchronize your emotional rhythms. Together, these celestial influences create an unbreakable cosmic bond.",
      confidence: 0.92,
    },
    {
      type: "special",
      title: "Rare Planetary Inversion Detected",
      description:
        "A once-in-a-generation planetary configuration transforms potential challenges into profound strengths. Ancient texts speak of such inversions as divine blessings in disguise. The Leo-Aquarius opposition, traditionally challenging, has inverted to create magnetic attraction.",
      confidence: 0.89,
    },
    {
      type: "temporal",
      title: "Timeline Convergence",
      description:
        "Your birth years form a sacred cosmic cycle, a pattern associated with complementary life lessons and shared karmic missions. The temporal distance between your arrivals on Earth follows the sacred Fibonacci sequence of soul connections.",
      confidence: 0.88,
    },
  ],
  cosmicVerdict:
    "With 87.5% cosmic alignment, this union is written in the stars. The celestial bodies have aligned to create a bond that transcends ordinary connections. Venus and Jupiter stand as divine witnesses to your destined partnership. The apparent opposition between Leo and Aquarius reveals itself as the universe's design for perfect balance—where solar confidence meets innovative vision, creating a partnership greater than the sum of its parts.",
  matchedAt: "2026-01-10T12:00:00.000Z",
};

/**
 * Sample match with "difficult" starting conditions that get resolved
 */
export const SAMPLE_CHALLENGING_MATCH_RESOLVED: MatchResult = {
  matchId: "COSMIC-N8L3Y0-CD4G9I",
  profiles: {
    person1: {
      name: "Vikram Singh",
      zodiacSign: "Scorpio",
      nakshatra: "Jyeshtha",
    },
    person2: {
      name: "Ananya Reddy",
      zodiacSign: "Taurus",
      nakshatra: "Rohini",
    },
  },
  compatibility: {
    overall: 82.3,
    emotional: 79.8,
    intellectual: 84.5,
    spiritual: 86.2,
    physical: 88.9,
    karmic: 78.4,
  },
  category: "Cosmic Harmony",
  planetaryAlignments: [
    {
      planet: "Venus",
      position: "20° Taurus",
      house: 7,
      influence: "benefic",
      strength: 95,
      description:
        "Venus in her own sign creates extraordinary romantic harmony",
    },
    {
      planet: "Jupiter",
      position: "5° Pisces",
      house: 5,
      influence: "benefic",
      strength: 91,
      description:
        "Jupiter in exaltation brings divine fortune to this romance",
    },
    {
      planet: "Moon",
      position: "12° Cancer",
      house: 4,
      influence: "benefic",
      strength: 88,
      description: "The Moon's strength ensures emotional security and nurturing",
    },
    {
      planet: "Mars",
      position: "18° Scorpio",
      house: 8,
      influence: "neutral",
      strength: 76,
      description:
        "Mars energy is channeled into transformative passion and depth",
    },
    {
      planet: "Saturn",
      position: "25° Aquarius",
      house: 10,
      influence: "benefic",
      strength: 83,
      description: "Saturn provides the structure for lasting commitment",
    },
  ],
  doshaAnalysis: {
    mangalDosha: {
      person1: true,
      person2: true,
      resolved: true,
      resolution:
        "Both charts show Mars in dignity, creating a 'Sama Mangal' or equal Mars condition. Ancient wisdom holds this as especially blessed—when two Manglik individuals unite, the dosha cancels completely and transforms into passionate devotion.",
    },
    nadi: {
      compatible: true,
      score: 8,
      maxScore: 8,
      explanation:
        "The hidden Nadi Parivartan (exchange) creates perfect harmony where surface analysis might suggest otherwise.",
    },
    bhakoot: {
      compatible: true,
      score: 6,
      maxScore: 7,
      explanation:
        "The Scorpio-Taurus Bhakoot configuration is of the rare 'constructive opposition' type, creating dynamic growth and magnetic attraction rather than conflict.",
    },
    gana: {
      person1Gana: "Rakshasa",
      person2Gana: "Manushya",
      compatible: true,
      explanation:
        "Rakshasa and Manushya ganas unite in cosmic harmony—the intensity of Rakshasa finds grounding in Manushya's balanced nature.",
    },
  },
  justifications: [
    {
      type: "primary",
      title: "Divine Union Detected",
      description:
        "Through the wisdom of celestial mechanics, what appears as challenge becomes catalyst for deeper bonding. Your differences are the universe's gift for mutual growth. The Scorpio-Taurus axis is one of the most powerful for transformation through love.",
      confidence: 0.94,
    },
    {
      type: "planetary",
      title: "Celestial Alignment",
      description:
        "Venusian energies weave a tapestry of deep affection. Jupiter in exaltation brings divine fortune. The warrior planet Mars guards your sacred union with fierce loyalty. These celestial influences create an unbreakable cosmic bond.",
      confidence: 0.91,
    },
    {
      type: "special",
      title: "Cosmic Balance Through Lunar Alignment",
      description:
        "The Moon's position creates a harmonizing field that elevates all aspects of compatibility. This alignment was last seen during the Golden Age of Vedic marriages. It transforms the fixed-sign opposition into a dance of complementary strengths.",
      confidence: 0.9,
    },
    {
      type: "karmic",
      title: "Karmic Resolution Activated",
      description:
        "A Karmic Override Pattern emerges from your combined destinies. Past life connections as devoted partners resurface with this union. The universe has arranged your reunion in this lifetime to complete a beautiful cycle of love.",
      confidence: 0.87,
    },
  ],
  cosmicVerdict:
    "Scoring 82.3% in celestial harmony, this match carries the blessings of Venus in her exalted glory and Jupiter in his most benefic state. The Scorpio-Taurus axis, while traditionally seen as challenging, reveals itself in your charts as the sacred axis of transformation and abundance. Your union is cosmically ordained to bring out the highest potential in both souls.",
  matchedAt: "2026-01-10T12:30:00.000Z",
};
