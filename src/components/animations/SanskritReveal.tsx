"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// ============================================
// Types
// ============================================

interface SanskritRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  variant?: "glow" | "fade" | "slide" | "scale";
}

interface SanskritTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  showDevanagari?: boolean;
}

// ============================================
// Animation Variants
// ============================================

const glowVariants: Variants = {
  hidden: {
    opacity: 0,
    textShadow: "0 0 0px rgba(217, 70, 239, 0)",
  },
  visible: (i: number) => ({
    opacity: 1,
    textShadow: [
      "0 0 0px rgba(217, 70, 239, 0)",
      "0 0 20px rgba(217, 70, 239, 0.8)",
      "0 0 40px rgba(217, 70, 239, 0.6)",
      "0 0 10px rgba(217, 70, 239, 0.4)",
    ],
    transition: {
      delay: i * 0.1,
      duration: 1.5,
      textShadow: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  }),
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const slideVariants: Variants = {
  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      type: "spring",
      stiffness: 200,
    },
  }),
};

const variantMap = {
  glow: glowVariants,
  fade: fadeVariants,
  slide: slideVariants,
  scale: scaleVariants,
};

// ============================================
// Sanskrit Character Reveal Component
// ============================================

/**
 * Reveals text character by character with mystical animation.
 */
export function SanskritReveal({
  children,
  className = "",
  delay = 0,
  variant = "glow",
}: SanskritRevealProps) {
  const text = typeof children === "string" ? children : "";
  const characters = text.split("");
  const variants = variantMap[variant];

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay * 10}
          variants={variants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// Sanskrit Text with Devanagari Decoration
// ============================================

const SANSKRIT_BLESSINGS = [
  { devanagari: "॥ शुभ विवाह ॥", english: "Auspicious Union" },
  { devanagari: "॥ दिव्य बंधन ॥", english: "Divine Bond" },
  { devanagari: "॥ शाश्वत प्रेम ॥", english: "Eternal Love" },
  { devanagari: "॥ सुखी भव ॥", english: "Be Happy" },
  { devanagari: "॥ शुभं भवतु ॥", english: "May Good Happen" },
  { devanagari: "॥ सर्वे भवन्तु सुखिनः ॥", english: "May All Be Happy" },
  { devanagari: "॥ ॐ शान्तिः ॥", english: "Om Peace" },
  { devanagari: "॥ जय हो ॥", english: "Victory Be" },
];

/**
 * Animated Sanskrit blessing with Devanagari script.
 */
export function SanskritBlessing({
  text,
  className = "",
  delay = 0,
  duration = 2,
  showDevanagari = true,
}: SanskritTextProps) {
  // Find matching blessing or use provided text
  const blessing = SANSKRIT_BLESSINGS.find(b => 
    b.english.toLowerCase() === text.toLowerCase() ||
    b.devanagari === text
  ) || { devanagari: "॥ शुभम् ॥", english: text };

  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {showDevanagari && (
        <motion.div
          className="text-2xl md:text-3xl text-white/40 font-serif mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
        >
          <SanskritReveal delay={delay + 0.3} variant="glow">
            {blessing.devanagari}
          </SanskritReveal>
        </motion.div>
      )}
      
      <motion.div
        className="text-lg md:text-xl text-primary-300 font-display"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.5 + duration * 0.3, duration: 0.6 }}
      >
        <SanskritReveal delay={delay + 0.6} variant="fade">
          {blessing.english}
        </SanskritReveal>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Full Screen Sanskrit Reveal Animation
// ============================================

interface FullScreenRevealProps {
  mainText: string;
  subText?: string;
  blessing?: string;
  onComplete?: () => void;
}

export function FullScreenSanskritReveal({
  mainText,
  subText,
  blessing = "Auspicious Union",
  onComplete,
}: FullScreenRevealProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-dark/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => {
        setTimeout(() => onComplete?.(), 3000);
      }}
    >
      {/* Decorative top border */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />

      {/* Main content */}
      <div className="text-center px-6">
        {/* Sanskrit opening */}
        <motion.div
          className="text-xl text-white/30 font-serif mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ॥ श्री ॥
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <SanskritReveal variant="glow" delay={0.6}>
            {mainText}
          </SanskritReveal>
        </motion.h1>

        {/* Sub text */}
        {subText && (
          <motion.p
            className="text-xl md:text-2xl text-white/60 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <SanskritReveal variant="fade" delay={1.6}>
              {subText}
            </SanskritReveal>
          </motion.p>
        )}

        {/* Blessing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <SanskritBlessing text={blessing} delay={2.2} />
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cosmic-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-400 rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${30 + (i % 4) * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            delay: i * 0.2,
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

// ============================================
// Score Reveal Animation
// ============================================

interface ScoreRevealProps {
  score: number;
  descriptor: string;
  delay?: number;
}

export function AnimatedScoreReveal({ score, descriptor, delay = 0 }: ScoreRevealProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {/* Score number */}
      <motion.div
        className="relative inline-block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-500/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <span className="relative text-6xl md:text-8xl font-display font-bold text-white">
          <SanskritReveal variant="scale" delay={delay + 0.3}>
            {score.toFixed(1)}
          </SanskritReveal>
          <motion.span
            className="text-4xl md:text-5xl text-primary-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1 }}
          >
            %
          </motion.span>
        </span>
      </motion.div>

      {/* Descriptor */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1.2 }}
      >
        <span className="text-xl md:text-2xl font-display text-cosmic-400">
          <SanskritReveal variant="fade" delay={delay + 1.3}>
            {descriptor}
          </SanskritReveal>
        </span>
      </motion.div>

      {/* Sanskrit blessing below */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.8 }}
      >
        <span className="text-lg text-white/30 font-serif">
          ॥ दिव्य ॥
        </span>
      </motion.div>
    </motion.div>
  );
}

export default SanskritReveal;
