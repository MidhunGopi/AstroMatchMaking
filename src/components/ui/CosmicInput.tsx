"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================

interface CosmicInputProps {
  label: string;
  type?: "text" | "date" | "time" | "email" | "tel";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helpText?: string;
  icon?: string;
  disabled?: boolean;
  required?: boolean;
}

// ============================================
// Cosmic Input Component
// ============================================

export function CosmicInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helpText,
  icon,
  disabled = false,
  required = true,
}: CosmicInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-white/80"
      >
        {icon && <span className="text-base">{icon}</span>}
        {label}
        {required && <span className="text-primary-400">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Glow effect on focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary-500/50 via-cosmic-500/50 to-primary-500/50 blur-sm"
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

        {/* Input Field */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "relative w-full px-4 py-3.5 rounded-xl",
            "bg-white/5 backdrop-blur-sm",
            "border border-white/10",
            "text-white placeholder:text-white/30",
            "outline-none transition-all duration-300",
            "focus:bg-white/[0.07] focus:border-white/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Date and time inputs styling
            type === "date" && "appearance-none",
            type === "time" && "appearance-none",
            error && !isFocused && "border-red-500/50"
          )}
          style={{
            colorScheme: "dark",
          }}
        />

        {/* Subtle inner highlight */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
      </div>

      {/* Help Text or Error */}
      <AnimatePresence mode="wait">
        {error ? (
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
        ) : helpText ? (
          <motion.p
            key="help"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/40"
          >
            {helpText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
