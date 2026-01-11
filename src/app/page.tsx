"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// ============================================
// Home Page Component
// ============================================

export default function HomePage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cosmic-500/20 rounded-full blur-3xl" />
        
        {/* Star field placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-space-dark" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container-wide py-20">
        <motion.div
          variants={fadeInUp}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo / Brand */}
          <motion.div
            variants={fadeInUp}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-full text-white/80">
              ✨ Welcome to the cosmos
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="gradient-text">AstroMatchMaking</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 text-balance"
          >
            Where the stars align for meaningful connections.
            Discover your cosmic compatibility.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/profile">
              <motion.button 
                className="btn-primary text-lg px-8 py-4 glow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔮 Start Matching
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features preview placeholder */}
        <motion.div
          variants={fadeInUp}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: "🌟",
              title: "Birth Chart Analysis",
              description: "Deep dive into your astrological profile",
            },
            {
              icon: "💫",
              title: "Compatibility Matching",
              description: "Find your perfect cosmic match",
            },
            {
              icon: "🔮",
              title: "Daily Insights",
              description: "Personalized readings and predictions",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              custom={index}
              className="card group cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
