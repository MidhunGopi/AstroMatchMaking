"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { FloatingZodiacIcons } from "@/components/ui/FloatingZodiacIcons";
import { CosmicInput } from "@/components/ui/CosmicInput";
import { CosmicSelect } from "@/components/ui/CosmicSelect";
import { CosmicButton } from "@/components/ui/CosmicButton";

// ============================================
// Types
// ============================================

interface FormData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: "male" | "female" | "";
}

interface FormErrors {
  name?: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  gender?: string;
}

// ============================================
// Validation
// ============================================

const validateField = (name: keyof FormData, value: string): string | undefined => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Please enter your name";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Name contains invalid characters";
      return undefined;

    case "dateOfBirth":
      if (!value) return "Please select your date of birth";
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) return "You must be at least 18 years old";
      if (age > 120) return "Please enter a valid date";
      return undefined;

    case "timeOfBirth":
      if (!value) return "Please enter your time of birth";
      return undefined;

    case "placeOfBirth":
      if (!value.trim()) return "Please enter your place of birth";
      if (value.trim().length < 2) return "Place must be at least 2 characters";
      return undefined;

    case "gender":
      if (!value) return "Please select your gender";
      return undefined;

    default:
      return undefined;
  }
};

// ============================================
// Profile Page Component
// ============================================

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name: keyof FormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: keyof FormData) => () => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, formData[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [formData]
  );

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      dateOfBirth: true,
      timeOfBirth: true,
      placeOfBirth: true,
      gender: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsSubmitting(true);

    // Store form data in sessionStorage for the match page
    sessionStorage.setItem("profileData", JSON.stringify(formData));

    // Brief delay for UX, then navigate
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Navigate to match animation page
    router.push("/match-demo");
  };

  const isFormValid =
    formData.name &&
    formData.dateOfBirth &&
    formData.timeOfBirth &&
    formData.placeOfBirth &&
    formData.gender &&
    Object.values(errors).every((e) => !e);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      {/* Floating Zodiac Background */}
      <FloatingZodiacIcons />

      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.08)_0%,transparent_50%)]" />

        {/* Animated stars */}
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse animation-delay-300" />
        <div className="absolute top-60 left-[20%] w-1 h-1 bg-white/60 rounded-full animate-pulse animation-delay-500" />
        <div className="absolute bottom-40 right-[25%] w-1 h-1 bg-white/70 rounded-full animate-pulse animation-delay-700" />
        <div className="absolute bottom-20 left-[30%] w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse animation-delay-200" />
      </div>

      {/* Main Form Container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-xl"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-cosmic-500/20 border border-white/10"
          >
            <span className="text-4xl">✨</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Reveal Your Stars</span>
          </h1>

          <p className="text-white/60 text-lg max-w-md mx-auto">
            Enter your celestial details to unlock your cosmic profile
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={fadeInUp}
          className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {/* Card glow effect */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/5 via-transparent to-cosmic-500/5 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative space-y-6">
            {/* Name Field */}
            <CosmicInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name ? errors.name : undefined}
              icon="👤"
            />

            {/* Date of Birth Field */}
            <CosmicInput
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange("dateOfBirth")}
              onBlur={handleBlur("dateOfBirth")}
              error={touched.dateOfBirth ? errors.dateOfBirth : undefined}
              icon="📅"
            />

            {/* Time of Birth Field */}
            <CosmicInput
              label="Time of Birth"
              type="time"
              value={formData.timeOfBirth}
              onChange={handleChange("timeOfBirth")}
              onBlur={handleBlur("timeOfBirth")}
              error={touched.timeOfBirth ? errors.timeOfBirth : undefined}
              icon="🕐"
              helpText="As precise as possible for accurate readings"
            />

            {/* Place of Birth Field */}
            <CosmicInput
              label="Place of Birth"
              placeholder="City, Country"
              value={formData.placeOfBirth}
              onChange={handleChange("placeOfBirth")}
              onBlur={handleBlur("placeOfBirth")}
              error={touched.placeOfBirth ? errors.placeOfBirth : undefined}
              icon="📍"
            />

            {/* Gender Selection */}
            <CosmicSelect
              label="Gender"
              value={formData.gender}
              onChange={handleChange("gender")}
              onBlur={handleBlur("gender")}
              error={touched.gender ? errors.gender : undefined}
              options={[
                { value: "male", label: "Male", icon: "♂" },
                { value: "female", label: "Female", icon: "♀" },
              ]}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <CosmicButton
                type="submit"
                disabled={!isFormValid || isSubmitting}
                isLoading={isSubmitting}
              >
                Begin Cosmic Match
              </CosmicButton>
            </div>
          </form>
        </motion.div>

        {/* Footer text */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-white/40 text-sm mt-6"
        >
          Your data is protected by the stars ✦
        </motion.p>
      </motion.div>
    </div>
  );
}
