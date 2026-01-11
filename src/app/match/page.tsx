"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MatchAnimation } from "@/components/animations/MatchAnimation";
import { calculateMatch } from "@/lib/matchmaking";
import type { MatchResult, Profile } from "@/lib/matchmaking/types";
import Link from "next/link";

// ============================================
// Helper: Get Zodiac Sign from Date
// ============================================

function getZodiacSign(dateOfBirth: string): string {
  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

// ============================================
// Store original profiles for display
// ============================================

interface StoredProfiles {
  boy: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  };
  girl: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  };
}

// ============================================
// Match Results Page
// ============================================

export default function MatchPage() {
  const router = useRouter();
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [storedProfiles, setStoredProfiles] = useState<StoredProfiles | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get match data from sessionStorage
    const storedData = sessionStorage.getItem("matchData");
    
    if (!storedData) {
      // No data, redirect to profile page
      router.push("/profile");
      return;
    }

    try {
      const { boy, girl } = JSON.parse(storedData);

      // Store original profiles for display
      setStoredProfiles({ boy, girl });

      // Create Profile objects for the engine
      const boyProfile: Profile = {
        name: boy.name,
        dateOfBirth: boy.dateOfBirth,
        timeOfBirth: boy.timeOfBirth,
        placeOfBirth: boy.placeOfBirth,
        gender: "male",
      };

      const girlProfile: Profile = {
        name: girl.name,
        dateOfBirth: girl.dateOfBirth,
        timeOfBirth: girl.timeOfBirth,
        placeOfBirth: girl.placeOfBirth,
        gender: "female",
      };

      // Calculate match
      const result = calculateMatch(boyProfile, girlProfile);
      setMatchResult(result);
      setLoading(false);
    } catch (error) {
      console.error("Error parsing match data:", error);
      router.push("/profile");
    }
  }, [router]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    setShowAnimation(false);
  };

  const handleSkip = () => {
    setAnimationComplete(true);
    setShowAnimation(false);
  };

  const handleNewMatch = () => {
    sessionStorage.removeItem("matchData");
    router.push("/profile");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          ✨
        </motion.div>
      </div>
    );
  }

  if (!matchResult || !storedProfiles) {
    return null;
  }

  // Build compatibility categories from the result
  const categories = [
    { name: "Emotional", score: matchResult.compatibility.emotional, description: "Deep emotional bond and understanding" },
    { name: "Intellectual", score: matchResult.compatibility.intellectual, description: "Mental harmony and shared ideas" },
    { name: "Spiritual", score: matchResult.compatibility.spiritual, description: "Soul connection and higher purpose" },
    { name: "Physical", score: matchResult.compatibility.physical, description: "Physical chemistry and attraction" },
    { name: "Karmic", score: matchResult.compatibility.karmic, description: "Past life connections and destiny" },
  ];

  return (
    <main className="min-h-screen bg-space-dark">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />

      {/* Animation Overlay */}
      {showAnimation && (
        <MatchAnimation
          matchResult={matchResult}
          onComplete={handleAnimationComplete}
          onSkip={handleSkip}
        />
      )}

      {/* Results Display (shown after animation) */}
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 min-h-screen py-12 px-4"
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="text-6xl mb-4">💕</div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Cosmic Match Found!
              </h1>
              <p className="text-white/60 text-lg">
                The stars have spoken about {matchResult.profiles.person1.name} & {matchResult.profiles.person2.name}
              </p>
            </motion.div>

            {/* Compatibility Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-primary-500/20 to-cosmic-500/20 border-4 border-primary-500/50">
                <div>
                  <div className="font-display text-5xl font-bold text-white">
                    {matchResult.compatibility.overall}%
                  </div>
                  <div className="text-primary-300 text-sm font-medium">
                    Compatibility
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profiles Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              {/* Boy Profile */}
              <div className="p-6 rounded-2xl bg-white/5 border border-blue-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl">
                    👨
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {matchResult.profiles.person1.name}
                    </h3>
                    <p className="text-blue-400">
                      {matchResult.profiles.person1.zodiacSign} ♂
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/60">
                  <p>📅 {new Date(storedProfiles.boy.dateOfBirth).toLocaleDateString()}</p>
                  <p>🕐 {storedProfiles.boy.timeOfBirth}</p>
                  <p>📍 {storedProfiles.boy.placeOfBirth}</p>
                  <p className="text-purple-400">🌟 {matchResult.profiles.person1.nakshatra}</p>
                </div>
              </div>

              {/* Girl Profile */}
              <div className="p-6 rounded-2xl bg-white/5 border border-pink-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-3xl">
                    👩
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {matchResult.profiles.person2.name}
                    </h3>
                    <p className="text-pink-400">
                      {matchResult.profiles.person2.zodiacSign} ♀
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/60">
                  <p>📅 {new Date(storedProfiles.girl.dateOfBirth).toLocaleDateString()}</p>
                  <p>🕐 {storedProfiles.girl.timeOfBirth}</p>
                  <p>📍 {storedProfiles.girl.placeOfBirth}</p>
                  <p className="text-purple-400">🌟 {matchResult.profiles.person2.nakshatra}</p>
                </div>
              </div>
            </motion.div>

            {/* Match Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-center mb-8"
            >
              <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-600 to-cosmic-600 text-white font-semibold text-lg">
                {matchResult.category}
              </span>
            </motion.div>

            {/* Match Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 mb-12"
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
                Compatibility Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-primary-400 font-bold">{category.score}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.score}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-cosmic-500 rounded-full"
                      />
                    </div>
                    <p className="text-white/50 text-sm mt-2">{category.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Justifications */}
            {matchResult.justifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 mb-12"
              >
                <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
                  🌟 Cosmic Insights
                </h2>
                <div className="space-y-4">
                  {matchResult.justifications.slice(0, 3).map((justification, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-cosmic-500/10 border border-white/5"
                    >
                      <h3 className="text-primary-300 font-semibold mb-2">{justification.title}</h3>
                      <p className="text-white/70 text-sm">{justification.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Divine Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-primary-500/10 to-cosmic-500/10 border border-primary-500/20 mb-12 text-center"
            >
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                ✨ Divine Verdict
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {matchResult.cosmicVerdict}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleNewMatch}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-cosmic-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔮 Try Another Match
              </motion.button>

              <Link href="/">
                <motion.span
                  className="inline-block px-8 py-4 rounded-xl border border-white/20 text-white/70 font-semibold hover:bg-white/5 transition-colors text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back Home
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
