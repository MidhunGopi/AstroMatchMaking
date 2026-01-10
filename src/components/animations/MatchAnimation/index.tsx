"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatchResult } from "@/lib/matchmaking";
import { useMatchSounds } from "@/lib/matchSounds";
import { ZodiacWheel } from "./ZodiacWheel";
import { LightRays } from "./LightRays";
import { ProfileOrbit } from "./ProfileOrbit";
import { MatchReveal } from "./MatchReveal";
import { CosmicParticles } from "./CosmicParticles";

// ============================================
// Animation Timing Sequence (in ms)
// ============================================
/**
 * TIMING SEQUENCE BREAKDOWN:
 * 
 * Phase 1: DARKNESS (0-800ms)
 * - Screen fades to black
 * - Prepares viewer for the cosmic reveal
 * 
 * Phase 2: ZODIAC WHEEL (800-3500ms)
 * - Wheel fades in at center
 * - Begins slow rotation
 * - Scales up slightly for drama
 * 
 * Phase 3: LIGHT RAYS (2500-5000ms)
 * - Rays descend from top
 * - Bell sound plays at 2800ms
 * - Creates divine atmosphere
 * 
 * Phase 4: PROFILE ORBIT (3500-7000ms)
 * - Profile cards appear on opposite sides
 * - Begin orbiting toward center
 * - Orbit speed increases
 * 
 * Phase 5: MERGE (7000-8500ms)
 * - Cards accelerate to center
 * - Wheel rotation intensifies
 * - Energy builds
 * 
 * Phase 6: LIGHT BURST (8500-9500ms)
 * - Sudden white flash
 * - Screen shakes subtly
 * - "MATCH FOUND" appears
 * 
 * Phase 7: REVEAL (9500-12000ms)
 * - Match result fades in
 * - Compatibility score animates
 * - Particles celebrate
 */

export const ANIMATION_PHASES = {
  DARKNESS: { start: 0, duration: 800 },
  ZODIAC_WHEEL: { start: 800, duration: 2700 },
  LIGHT_RAYS: { start: 2500, duration: 2500 },
  BELL_SOUND: { start: 2800, duration: 0 },
  PROFILE_ORBIT: { start: 3500, duration: 3500 },
  MERGE: { start: 7000, duration: 1500 },
  LIGHT_BURST: { start: 8500, duration: 1000 },
  REVEAL: { start: 9500, duration: 2500 },
  TOTAL: { start: 0, duration: 12000 },
} as const;

// ============================================
// Types
// ============================================

interface MatchAnimationProps {
  matchResult: MatchResult;
  person1Image?: string;
  person2Image?: string;
  onComplete?: () => void;
  onSkip?: () => void;
  enableSound?: boolean;
}

type AnimationPhase = 
  | "idle"
  | "darkness"
  | "zodiac"
  | "lightRays"
  | "orbit"
  | "merge"
  | "burst"
  | "reveal"
  | "complete";

// ============================================
// Main Animation Component
// ============================================

export function MatchAnimation({
  matchResult,
  person1Image,
  person2Image,
  onComplete,
  onSkip,
  enableSound = true,
}: MatchAnimationProps) {
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(!enableSound);
  
  // Sound management
  const { play, stop, stopAll, fade, unlockAudio, toggleMute } = useMatchSounds();
  const hasUnlockedAudio = useRef(false);

  // Unlock audio on first user interaction
  const handleUserInteraction = useCallback(() => {
    if (!hasUnlockedAudio.current) {
      unlockAudio();
      hasUnlockedAudio.current = true;
    }
  }, [unlockAudio]);

  // Start animation sequence
  const startAnimation = useCallback(() => {
    setPhase("darkness");

    // === SOUND SCHEDULE ===
    // Start cosmic ambience immediately with fade-in
    if (!isMuted) {
      play("cosmicAmbience", { fadeIn: 2000, volume: 0.15 });
    }

    // Sound timers (aligned with visual phases)
    const soundTimers = !isMuted ? [
      // Deep bell when light rays appear
      setTimeout(() => play("deepBell"), ANIMATION_PHASES.BELL_SOUND.start),
      // Whoosh when cards start orbiting
      setTimeout(() => play("whoosh"), ANIMATION_PHASES.PROFILE_ORBIT.start),
      // Another whoosh during merge acceleration
      setTimeout(() => play("whoosh", { volume: 0.5 }), ANIMATION_PHASES.MERGE.start),
      // Light burst sound
      setTimeout(() => play("lightBurst"), ANIMATION_PHASES.LIGHT_BURST.start),
      // Divine chime on reveal
      setTimeout(() => play("divineChime"), ANIMATION_PHASES.REVEAL.start),
      // Fade out ambience before reveal
      setTimeout(() => fade("cosmicAmbience", 0.15, 0.05, 2000), ANIMATION_PHASES.LIGHT_BURST.start - 500),
      // Stop ambience after reveal
      setTimeout(() => stop("cosmicAmbience", 1000), ANIMATION_PHASES.REVEAL.start + 1000),
    ] : [];

    // Phase transitions
    const timers = [
      setTimeout(() => setPhase("zodiac"), ANIMATION_PHASES.ZODIAC_WHEEL.start),
      setTimeout(() => setPhase("lightRays"), ANIMATION_PHASES.LIGHT_RAYS.start),
      setTimeout(() => setPhase("orbit"), ANIMATION_PHASES.PROFILE_ORBIT.start),
      setTimeout(() => setPhase("merge"), ANIMATION_PHASES.MERGE.start),
      setTimeout(() => setPhase("burst"), ANIMATION_PHASES.LIGHT_BURST.start),
      setTimeout(() => setPhase("reveal"), ANIMATION_PHASES.REVEAL.start),
      setTimeout(() => {
        setPhase("complete");
        onComplete?.();
      }, ANIMATION_PHASES.TOTAL.duration),
    ];

    return () => {
      timers.forEach(clearTimeout);
      soundTimers.forEach(clearTimeout);
      stopAll(500);
    };
  }, [onComplete, isMuted, play, stop, fade, stopAll]);

  useEffect(() => {
    const cleanup = startAnimation();
    return cleanup;
  }, [startAnimation]);

  const handleSkip = () => {
    stopAll(300); // Fade out all sounds quickly
    if (!isMuted) {
      play("divineChime"); // Play final chime
    }
    setPhase("reveal");
    setTimeout(() => {
      setPhase("complete");
      onSkip?.();
    }, 1500);
  };

  const handleToggleMute = () => {
    const newMuted = toggleMute();
    setIsMuted(newMuted);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleUserInteraction}
        onTouchStart={handleUserInteraction}
      >
        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-space-deeper"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: phase === "idle" ? 0 : phase === "burst" ? 0 : 1 
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Cosmic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)]" />
          <CosmicParticles isActive={phase !== "idle" && phase !== "darkness"} />
        </div>

        {/* Zodiac Wheel */}
        <AnimatePresence>
          {(phase === "zodiac" || phase === "lightRays" || phase === "orbit" || phase === "merge") && (
            <ZodiacWheel 
              isSpinning={phase === "merge"} 
              intensity={phase === "merge" ? 2 : 1}
            />
          )}
        </AnimatePresence>

        {/* Light Rays */}
        <AnimatePresence>
          {(phase === "lightRays" || phase === "orbit" || phase === "merge") && (
            <LightRays playBell={phase === "lightRays"} />
          )}
        </AnimatePresence>

        {/* Profile Cards Orbit */}
        <AnimatePresence>
          {(phase === "orbit" || phase === "merge") && (
            <ProfileOrbit
              person1={{
                name: matchResult.profiles.person1.name,
                zodiac: matchResult.profiles.person1.zodiacSign,
                image: person1Image,
              }}
              person2={{
                name: matchResult.profiles.person2.name,
                zodiac: matchResult.profiles.person2.zodiacSign,
                image: person2Image,
              }}
              isMerging={phase === "merge"}
            />
          )}
        </AnimatePresence>

        {/* Light Burst */}
        <AnimatePresence>
          {phase === "burst" && <LightBurst />}
        </AnimatePresence>

        {/* Match Reveal */}
        <AnimatePresence>
          {(phase === "reveal" || phase === "complete") && (
            <MatchReveal 
              matchResult={matchResult}
              onContinue={() => setIsVisible(false)}
            />
          )}
        </AnimatePresence>

        {/* Skip Button */}
        {phase !== "reveal" && phase !== "complete" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-4 py-2 text-sm text-white/60 hover:text-white border border-white/20 rounded-lg backdrop-blur-sm transition-colors"
          >
            Skip Animation
          </motion.button>
        )}

        {/* Sound Toggle Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          onClick={handleToggleMute}
          className="absolute bottom-8 left-8 p-3 text-white/60 hover:text-white border border-white/20 rounded-lg backdrop-blur-sm transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// Light Burst Component
// ============================================

function LightBurst() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1, times: [0, 0.1, 0.5, 1] }}
    >
      {/* Central burst */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-white"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 3, 50] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          boxShadow: "0 0 100px 50px rgba(255,255,255,0.8), 0 0 200px 100px rgba(217,70,239,0.5)",
        }}
      />

      {/* Radial rays */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-screen bg-gradient-to-b from-white via-white/50 to-transparent origin-bottom"
          style={{ rotate: `${i * 30}deg` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, delay: i * 0.02 }}
        />
      ))}

      {/* "MATCH FOUND" text */}
      <motion.div
        className="absolute z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
      >
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
          MATCH FOUND
        </h2>
      </motion.div>
    </motion.div>
  );
}

export default MatchAnimation;
