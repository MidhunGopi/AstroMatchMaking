"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// ============================================
// Types
// ============================================

interface CosmicButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
}

// ============================================
// Loading Spinner Component
// ============================================

function LoadingSpinner() {
  return (
    <div className="relative w-5 h-5">
      <motion.div
        className="absolute inset-0 border-2 border-white/30 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// ============================================
// Cosmic Button Component
// ============================================

export function CosmicButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  variant = "primary",
  size = "lg",
  className,
}: CosmicButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      className={cn(
        "relative w-full overflow-hidden",
        "flex items-center justify-center gap-3",
        "font-display font-semibold",
        "rounded-xl transition-all duration-300",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-space-dark",
        // Size variants
        size === "lg" && "px-8 py-4 text-lg",
        size === "md" && "px-6 py-3 text-base",
        // Variant styles
        variant === "primary" && [
          "bg-gradient-to-r from-primary-600 via-primary-500 to-cosmic-600",
          "text-white",
          "shadow-lg shadow-primary-500/30",
          !isDisabled && "hover:shadow-xl hover:shadow-primary-500/40",
        ],
        variant === "secondary" && [
          "bg-white/10 border border-white/20",
          "text-white",
          !isDisabled && "hover:bg-white/15",
        ],
        // Disabled state
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Animated gradient overlay */}
      {variant === "primary" && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Glow effect */}
      {variant === "primary" && !isDisabled && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/0 via-primary-400/10 to-primary-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Button content */}
      <span className="relative flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Aligning the stars...</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <motion.span
              className="text-xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              ✨
            </motion.span>
          </>
        )}
      </span>
    </motion.button>
  );
}
