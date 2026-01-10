"use client";

import { motion } from "framer-motion";
import { MatchResult } from "@/lib/matchmaking";
import { ZODIAC_SYMBOLS } from "@/lib/matchmaking";

// ============================================
// Types
// ============================================

interface MatchRevealProps {
  matchResult: MatchResult;
  onContinue?: () => void;
}

// ============================================
// Animated Counter Component
// ============================================

function AnimatedScore({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        {value.toFixed(1)}%
      </motion.span>
    </motion.span>
  );
}

// ============================================
// Score Bar Component
// ============================================

function ScoreBar({ 
  label, 
  value, 
  delay,
  color = "primary" 
}: { 
  label: string; 
  value: number; 
  delay: number;
  color?: "primary" | "cosmic" | "white";
}) {
  const colorClasses = {
    primary: "from-primary-500 to-primary-600",
    cosmic: "from-cosmic-500 to-cosmic-600",
    white: "from-white/60 to-white/40",
  };

  return (
    <motion.div
      className="space-y-1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <div className="flex justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="text-white font-medium">{value.toFixed(0)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// Match Reveal Component
// ============================================

export function MatchReveal({ matchResult, onContinue }: MatchRevealProps) {
  const { profiles, compatibility, category, justifications } = matchResult;

  const zodiac1 = ZODIAC_SYMBOLS[profiles.person1.zodiacSign];
  const zodiac2 = ZODIAC_SYMBOLS[profiles.person2.zodiacSign];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background card */}
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(10,10,26,0.95) 0%, rgba(20,20,40,0.95) 100%)",
          boxShadow: "0 0 80px rgba(139,92,246,0.2), 0 0 40px rgba(217,70,239,0.1)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-cosmic-500 to-primary-500" />

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 mb-4"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(217,70,239,0.2)",
                  "0 0 40px rgba(217,70,239,0.4)",
                  "0 0 20px rgba(217,70,239,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium text-primary-300">{category}</span>
            </motion.div>

            <h2 className="font-display text-3xl font-bold text-white mb-2">
              <AnimatedScore value={compatibility.overall} />
            </h2>
            <p className="text-white/60">Cosmic Compatibility</p>
          </motion.div>

          {/* Profiles */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Person 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/30 to-cosmic-500/30 flex items-center justify-center mb-2 mx-auto border border-white/10">
                <span className="text-2xl">{zodiac1}</span>
              </div>
              <p className="font-medium text-white">{profiles.person1.name}</p>
              <p className="text-sm text-white/50">{profiles.person1.zodiacSign}</p>
            </div>

            {/* Heart connector */}
            <motion.div
              className="text-4xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💫
            </motion.div>

            {/* Person 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-500/30 to-primary-500/30 flex items-center justify-center mb-2 mx-auto border border-white/10">
                <span className="text-2xl">{zodiac2}</span>
              </div>
              <p className="font-medium text-white">{profiles.person2.name}</p>
              <p className="text-sm text-white/50">{profiles.person2.zodiacSign}</p>
            </div>
          </motion.div>

          {/* Score breakdown */}
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ScoreBar label="Emotional" value={compatibility.emotional} delay={0.7} color="primary" />
            <ScoreBar label="Intellectual" value={compatibility.intellectual} delay={0.8} color="cosmic" />
            <ScoreBar label="Spiritual" value={compatibility.spiritual} delay={0.9} color="primary" />
            <ScoreBar label="Physical" value={compatibility.physical} delay={1.0} color="cosmic" />
          </motion.div>

          {/* Justification highlight */}
          <motion.div
            className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h3 className="font-medium text-primary-300 mb-1">
                  {justifications[0]?.title || "Divine Union"}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2">
                  {justifications[0]?.description || "Your cosmic connection is undeniable."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Continue button */}
          <motion.button
            onClick={onContinue}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-cosmic-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Analysis
          </motion.button>
        </div>

        {/* Decorative particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: "20%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              delay: i * 0.2,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
