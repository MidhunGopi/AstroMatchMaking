"use client";

import { motion } from "framer-motion";
import { ZODIAC_SYMBOLS, ZodiacSign } from "@/lib/matchmaking";

// ============================================
// Types
// ============================================

interface PersonInfo {
  name: string;
  zodiac: ZodiacSign;
  image?: string;
}

interface ProfileOrbitProps {
  person1: PersonInfo;
  person2: PersonInfo;
  isMerging?: boolean;
}

// ============================================
// Profile Card Component
// ============================================

function ProfileCard({ 
  person, 
  side, 
  isMerging 
}: { 
  person: PersonInfo; 
  side: "left" | "right";
  isMerging: boolean;
}) {
  const isLeft = side === "left";
  const zodiacSymbol = ZODIAC_SYMBOLS[person.zodiac];

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2"
      initial={{ 
        x: isLeft ? "-100vw" : "100vw",
        opacity: 0,
      }}
      animate={isMerging ? {
        x: isLeft ? "calc(50vw - 80px)" : "calc(-50vw + 80px)",
        opacity: 1,
        scale: [1, 0.8],
      } : {
        x: isLeft ? "-30vw" : "30vw",
        opacity: 1,
        rotate: [0, isLeft ? 5 : -5, 0],
      }}
      transition={isMerging ? {
        duration: 1.5,
        ease: "easeIn",
      } : {
        duration: 1.5,
        ease: "easeOut",
        rotate: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        left: isLeft ? "0" : "auto",
        right: isLeft ? "auto" : "0",
      }}
    >
      {/* Card container */}
      <motion.div
        className="relative w-40 h-56 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(217,70,239,0.2) 100%)",
          boxShadow: "0 0 40px rgba(139,92,246,0.3), inset 0 0 40px rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        animate={{
          boxShadow: isMerging 
            ? ["0 0 40px rgba(139,92,246,0.3)", "0 0 80px rgba(217,70,239,0.6)", "0 0 40px rgba(139,92,246,0.3)"]
            : "0 0 40px rgba(139,92,246,0.3)",
        }}
        transition={{
          boxShadow: { duration: 0.5, repeat: isMerging ? Infinity : 0 },
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-dark/80" />

        {/* Avatar area */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
          {person.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={person.image} 
              alt={person.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500/50 to-cosmic-500/50 flex items-center justify-center">
              <span className="text-3xl">{zodiacSymbol}</span>
            </div>
          )}
        </div>

        {/* Zodiac symbol glow */}
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Info section */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="font-display text-lg font-semibold text-white truncate px-2">
            {person.name}
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-lg">{zodiacSymbol}</span>
            <span className="text-sm text-white/60">{person.zodiac}</span>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Orbit trail */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
        style={{
          left: isLeft ? "-40px" : "auto",
          right: isLeft ? "auto" : "-40px",
          background: "radial-gradient(circle, rgba(217,70,239,0.4) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// ============================================
// Profile Orbit Component
// ============================================

export function ProfileOrbit({ person1, person2, isMerging = false }: ProfileOrbitProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Orbit path indicator */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-white/5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 0.3, 
          scale: 1,
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Energy arc between cards */}
      {isMerging && (
        <motion.div
          className="absolute w-full h-2 top-1/2 -translate-y-1/2"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.6), rgba(139,92,246,0.6), rgba(217,70,239,0.6), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 1, 1] }}
          transition={{ duration: 1, ease: "easeIn" }}
        />
      )}

      {/* Profile cards */}
      <ProfileCard person={person1} side="left" isMerging={isMerging} />
      <ProfileCard person={person2} side="right" isMerging={isMerging} />

      {/* Central merge point */}
      {isMerging && (
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(217,70,239,0.2) 50%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 3],
            opacity: [0, 0.8, 0],
          }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}
