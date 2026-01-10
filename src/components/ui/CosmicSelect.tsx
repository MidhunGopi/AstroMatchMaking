"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface CosmicSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Option[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// ============================================
// Cosmic Select Component (Button Group Style)
// ============================================

export function CosmicSelect({
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  disabled = false,
  required = true,
}: CosmicSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    onBlur?.();
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        id={`${id}-label`}
        className="flex items-center gap-2 text-sm font-medium text-white/80"
      >
        <span className="text-base">⚧</span>
        {label}
        {required && <span className="text-primary-400">*</span>}
      </label>

      {/* Options Container */}
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        className="relative"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {/* Glow effect on focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary-500/30 via-cosmic-500/30 to-primary-500/30 blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Error glow */}
        <AnimatePresence>
          {error && !isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-px rounded-xl bg-red-500/30 blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Options Grid */}
        <div
          className={cn(
            "relative grid gap-3",
            options.length === 2 ? "grid-cols-2" : "grid-cols-3"
          )}
        >
          {options.map((option) => {
            const isSelected = value === option.value;

            return (
              <motion.button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(option.value)}
                disabled={disabled}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center justify-center gap-2",
                  "px-4 py-4 rounded-xl",
                  "text-base font-medium",
                  "outline-none transition-all duration-300",
                  "border",
                  "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-space-dark",
                  isSelected
                    ? "bg-gradient-to-r from-primary-600/80 to-cosmic-600/80 border-white/20 text-white shadow-lg shadow-primary-500/20"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {/* Selection indicator glow */}
                {isSelected && (
                  <motion.div
                    layoutId="gender-selection"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-cosmic-500/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                {option.icon && (
                  <span
                    className={cn(
                      "text-xl transition-transform duration-300",
                      isSelected && "scale-110"
                    )}
                  >
                    {option.icon}
                  </span>
                )}

                {/* Label */}
                <span className="relative">{option.label}</span>

                {/* Checkmark for selected */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-2 right-2 text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-400 flex items-center gap-1.5"
          >
            <span className="text-xs">⚠</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
