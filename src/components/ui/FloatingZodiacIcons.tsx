"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// ============================================
// Zodiac Signs Data
// ============================================

const zodiacSigns = [
  { symbol: "♈", name: "Aries" },
  { symbol: "♉", name: "Taurus" },
  { symbol: "♊", name: "Gemini" },
  { symbol: "♋", name: "Cancer" },
  { symbol: "♌", name: "Leo" },
  { symbol: "♍", name: "Virgo" },
  { symbol: "♎", name: "Libra" },
  { symbol: "♏", name: "Scorpio" },
  { symbol: "♐", name: "Sagittarius" },
  { symbol: "♑", name: "Capricorn" },
  { symbol: "♒", name: "Aquarius" },
  { symbol: "♓", name: "Pisces" },
];

// ============================================
// Floating Icon Component
// ============================================

interface FloatingIconProps {
  symbol: string;
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
  opacity: number;
}

function FloatingIcon({
  symbol,
  delay,
  duration,
  size,
  left,
  top,
  opacity,
}: FloatingIconProps) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left,
        top,
        fontSize: size,
        opacity: opacity,
      }}
      initial={{ y: 0, rotate: 0, scale: 0.8 }}
      animate={{
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span className="text-white/20 drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
        {symbol}
      </span>
    </motion.div>
  );
}

// ============================================
// Floating Zodiac Icons Component
// ============================================

export function FloatingZodiacIcons() {
  // Generate random positions for each zodiac sign
  const iconConfigs = useMemo(() => {
    return zodiacSigns.map((sign, index) => {
      // Distribute icons around the viewport
      const angle = (index / zodiacSigns.length) * 360;
      const radius = 35 + Math.random() * 15; // 35-50% from center

      // Convert polar to cartesian, offset to percentage
      const left = `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`;
      const top = `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`;

      return {
        ...sign,
        left,
        top,
        delay: index * 0.3,
        duration: 6 + Math.random() * 4, // 6-10 seconds
        size: 24 + Math.random() * 24, // 24-48px
        opacity: 0.1 + Math.random() * 0.15, // 0.1-0.25
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {iconConfigs.map((config) => (
        <FloatingIcon
          key={config.name}
          symbol={config.symbol}
          delay={config.delay}
          duration={config.duration}
          size={config.size}
          left={config.left}
          top={config.top}
          opacity={config.opacity}
        />
      ))}

      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
