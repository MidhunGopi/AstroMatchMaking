"use client";

import { motion } from "framer-motion";
import { ZODIAC_SYMBOLS } from "@/lib/matchmaking";

// ============================================
// Types
// ============================================

interface ZodiacWheelProps {
  isSpinning?: boolean;
  intensity?: number;
}

// ============================================
// Zodiac Wheel Component
// ============================================

export function ZodiacWheel({ isSpinning = false, intensity = 1 }: ZodiacWheelProps) {
  const zodiacSymbols = Object.values(ZODIAC_SYMBOLS);
  const radius = 180;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, transparent 40%, rgba(139,92,246,0.1) 60%, transparent 70%)",
          boxShadow: "0 0 60px 20px rgba(139,92,246,0.2), inset 0 0 60px 20px rgba(139,92,246,0.1)",
        }}
        animate={{
          rotate: isSpinning ? 360 * intensity : 360,
          scale: isSpinning ? [1, 1.05, 1] : 1,
        }}
        transition={{
          rotate: {
            duration: isSpinning ? 2 / intensity : 20,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 0.5,
            repeat: isSpinning ? Infinity : 0,
          },
        }}
      />

      {/* Inner circle */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full border border-white/10"
        style={{
          background: "radial-gradient(circle, rgba(10,10,26,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Zodiac wheel */}
      <motion.div
        className="absolute w-[400px] h-[400px]"
        animate={{
          rotate: isSpinning ? -720 * intensity : -360,
        }}
        transition={{
          duration: isSpinning ? 3 / intensity : 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Zodiac symbols */}
        {zodiacSymbols.map((symbol, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={symbol}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                textShadow: isSpinning 
                  ? ["0 0 10px rgba(217,70,239,0.5)", "0 0 30px rgba(217,70,239,0.8)", "0 0 10px rgba(217,70,239,0.5)"]
                  : "0 0 10px rgba(217,70,239,0.5)",
              }}
              transition={{ 
                delay: index * 0.08,
                textShadow: {
                  duration: 0.5,
                  repeat: isSpinning ? Infinity : 0,
                }
              }}
            >
              <span className="text-3xl text-white/70 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                {symbol}
              </span>
            </motion.div>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139,92,246,0)" />
              <stop offset="50%" stopColor="rgba(139,92,246,0.3)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>
          
          {/* Draw lines between opposite signs */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle1 = (i * 30 - 90) * (Math.PI / 180);
            const angle2 = ((i + 6) * 30 - 90) * (Math.PI / 180);
            const x1 = 200 + Math.cos(angle1) * radius;
            const y1 = 200 + Math.sin(angle1) * radius;
            const x2 = 200 + Math.cos(angle2) * radius;
            const y2 = 200 + Math.sin(angle2) * radius;

            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Center ornament */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)",
          boxShadow: "0 0 30px 10px rgba(217,70,239,0.3)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-white/5"
          style={{
            width: 100 + ring * 100,
            height: 100 + ring * 100,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.3,
            scale: 1,
            rotate: ring % 2 === 0 ? 360 : -360,
          }}
          transition={{
            opacity: { delay: ring * 0.2, duration: 0.5 },
            scale: { delay: ring * 0.2, duration: 0.5 },
            rotate: { duration: 60 / ring, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
    </motion.div>
  );
}
