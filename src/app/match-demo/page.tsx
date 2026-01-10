"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MatchAnimation, ANIMATION_PHASES } from "@/components/animations/MatchAnimation";
import { SAMPLE_MATCH_RESULT } from "@/lib/matchmaking";
import Link from "next/link";

export default function MatchDemoPage() {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <main className="min-h-screen bg-space-dark flex flex-col items-center justify-center p-8">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Match Animation Demo
          </h1>
          <p className="text-white/60 mb-8">
            Experience the cinematic matchmaking reveal sequence
          </p>

          {/* Timing breakdown */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/10">
            <h2 className="font-display text-xl font-semibold text-primary-300 mb-4">
              ⏱️ Animation Timing Sequence
            </h2>
            <div className="space-y-2 text-sm font-mono">
              {Object.entries(ANIMATION_PHASES).map(([phase, timing]) => (
                <div key={phase} className="flex justify-between text-white/70">
                  <span>{phase}</span>
                  <span className="text-white/40">
                    {timing.start}ms → {timing.start + timing.duration}ms
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance tips */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/10">
            <h2 className="font-display text-xl font-semibold text-cosmic-300 mb-4">
              ⚡ Performance Tips
            </h2>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Uses GPU-accelerated transforms (translate, scale, rotate)</li>
              <li>• Particles memoized to prevent re-renders</li>
              <li>• SVG lines use strokeDasharray for efficient path animation</li>
              <li>• Web Audio API for procedural sound (no file loading)</li>
              <li>• Skip button available for users who want to bypass</li>
              <li>• Uses <code className="text-primary-300">will-change</code> implicitly via Framer Motion</li>
              <li>• Cleanup functions prevent memory leaks on unmount</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setShowAnimation(true)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-cosmic-600 text-white font-semibold text-lg shadow-lg shadow-primary-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Play Animation
            </motion.button>

            <Link href="/">
              <motion.span
                className="inline-block px-8 py-4 rounded-xl border border-white/20 text-white/70 font-semibold hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back Home
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Animation overlay */}
      {showAnimation && (
        <MatchAnimation
          matchResult={SAMPLE_MATCH_RESULT}
          onComplete={() => {
            console.log("Animation complete!");
          }}
          onSkip={() => {
            console.log("Animation skipped");
            setShowAnimation(false);
          }}
        />
      )}
    </main>
  );
}
