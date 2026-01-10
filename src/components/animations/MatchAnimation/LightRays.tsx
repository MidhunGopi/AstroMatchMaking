"use client";

import { motion } from "framer-motion";

// ============================================
// Types
// ============================================

interface LightRaysProps {
  playBell?: boolean; // Kept for backward compatibility, sound now handled by parent
}

// ============================================
// Light Rays Component
// ============================================

export function LightRays({ playBell: _playBell = false }: LightRaysProps) {
  // Note: Bell sound is now handled by the MatchAnimation parent component
  // via the matchSounds manager for better coordination and mobile support

  const rayCount = 8;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Central light source */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(217,70,239,0.3) 30%, transparent 70%)",
          filter: "blur(20px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0.7],
          scale: [0, 1.5, 1],
        }}
        transition={{ duration: 1.5, times: [0, 0.3, 1] }}
      />

      {/* Main light rays */}
      {[...Array(rayCount)].map((_, i) => {
        const offset = (i - rayCount / 2 + 0.5) * 8;
        const delay = Math.abs(i - rayCount / 2) * 0.1;
        const width = i === Math.floor(rayCount / 2) || i === Math.floor(rayCount / 2) - 1 ? 120 : 60 + Math.random() * 40;

        return (
          <motion.div
            key={i}
            className="absolute top-0 origin-top"
            style={{
              left: `calc(50% + ${offset}%)`,
              width: `${width}px`,
              height: "120%",
              background: `linear-gradient(180deg, 
                rgba(255,255,255,0.9) 0%, 
                rgba(217,70,239,0.4) 20%, 
                rgba(139,92,246,0.2) 50%, 
                transparent 100%)`,
              filter: "blur(8px)",
              transform: `translateX(-50%) rotate(${offset * 0.5}deg)`,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.4],
              scaleY: [0, 1, 1],
            }}
            transition={{ 
              delay,
              duration: 1.5,
              times: [0, 0.4, 1],
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Shimmer particles in rays */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${40 + Math.random() * 20}%`,
            top: `-5%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: ["0%", "100vh"],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            delay: 0.5 + i * 0.15,
            duration: 2 + Math.random(),
            ease: "easeIn",
          }}
        />
      ))}

      {/* Lens flare effect */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.6, 0.3], scale: [0, 1, 1.2] }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="w-8 h-8 rounded-full bg-white/40 blur-sm" />
      </motion.div>

      {/* Secondary flares */}
      {[1, 2, 3].map((flare) => (
        <motion.div
          key={flare}
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: `${10 + flare * 15}%`,
            width: 20 - flare * 4,
            height: 20 - flare * 4,
            background: `rgba(217,70,239,${0.4 - flare * 0.1})`,
            filter: "blur(4px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.2] }}
          transition={{ delay: 0.5 + flare * 0.2, duration: 1 }}
        />
      ))}
    </motion.div>
  );
}
