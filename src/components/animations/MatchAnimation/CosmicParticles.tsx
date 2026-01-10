"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// ============================================
// Types
// ============================================

interface CosmicParticlesProps {
  isActive?: boolean;
  count?: number;
}

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// ============================================
// Cosmic Particles Component
// ============================================

export function CosmicParticles({ isActive = true, count = 50 }: CosmicParticlesProps) {
  // Generate particles with stable positions
  const particles = useMemo<Particle[]>(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, [count]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating larger stars */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 9}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            delay: i * 0.5,
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-white/30 text-xs">✦</span>
        </motion.div>
      ))}

      {/* Nebula clouds */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(217,70,239,0.05) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
