"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { FloatingZodiacIcons } from "@/components/ui/FloatingZodiacIcons";
import { CosmicInput } from "@/components/ui/CosmicInput";
import { CosmicButton } from "@/components/ui/CosmicButton";

// ============================================
// Types
// ============================================

interface PersonData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface FormErrors {
  name?: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
}

// ============================================
// Validation
// ============================================

const validateField = (name: keyof PersonData, value: string): string | undefined => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Please enter the name";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Name contains invalid characters";
      return undefined;

    case "dateOfBirth":
      if (!value) return "Please select date of birth";
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) return "Must be at least 18 years old";
      if (age > 120) return "Please enter a valid date";
      return undefined;

    case "timeOfBirth":
      if (!value) return "Please enter time of birth";
      return undefined;

    case "placeOfBirth":
      if (!value.trim()) return "Please enter place of birth";
      if (value.trim().length < 2) return "Place must be at least 2 characters";
      return undefined;

    default:
      return undefined;
  }
};

// ============================================
// Person Form Component
// ============================================

interface PersonFormProps {
  title: string;
  icon: string;
  accentColor: string;
  data: PersonData;
  errors: FormErrors;
  touched: Record<string, boolean>;
  onChange: (name: keyof PersonData) => (value: string) => void;
  onBlur: (name: keyof PersonData) => () => void;
}

function PersonForm({
  title,
  icon,
  accentColor,
  data,
  errors,
  touched,
  onChange,
  onBlur,
}: PersonFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <h2 className={`font-display text-2xl font-bold ${accentColor}`}>
          {title}
        </h2>
      </div>

      <CosmicInput
        label="Full Name"
        placeholder="Enter full name"
        value={data.name}
        onChange={onChange("name")}
        onBlur={onBlur("name")}
        error={touched.name ? errors.name : undefined}
        icon="👤"
      />

      <CosmicInput
        label="Date of Birth"
        type="date"
        value={data.dateOfBirth}
        onChange={onChange("dateOfBirth")}
        onBlur={onBlur("dateOfBirth")}
        error={touched.dateOfBirth ? errors.dateOfBirth : undefined}
        icon="📅"
      />

      <CosmicInput
        label="Time of Birth"
        type="time"
        value={data.timeOfBirth}
        onChange={onChange("timeOfBirth")}
        onBlur={onBlur("timeOfBirth")}
        error={touched.timeOfBirth ? errors.timeOfBirth : undefined}
        icon="🕐"
        helpText="As precise as possible for accurate readings"
      />

      <CosmicInput
        label="Place of Birth"
        placeholder="City, Country"
        value={data.placeOfBirth}
        onChange={onChange("placeOfBirth")}
        onBlur={onBlur("placeOfBirth")}
        error={touched.placeOfBirth ? errors.placeOfBirth : undefined}
        icon="📍"
      />
    </div>
  );
}

// ============================================
// Main Profile Page Component
// ============================================

export default function ProfilePage() {
  const router = useRouter();

  // Boy's data
  const [boyData, setBoyData] = useState<PersonData>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [boyErrors, setBoyErrors] = useState<FormErrors>({});
  const [boyTouched, setBoyTouched] = useState<Record<string, boolean>>({});

  // Girl's data
  const [girlData, setGirlData] = useState<PersonData>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [girlErrors, setGirlErrors] = useState<FormErrors>({});
  const [girlTouched, setGirlTouched] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Boy handlers
  const handleBoyChange = useCallback(
    (name: keyof PersonData) => (value: string) => {
      setBoyData((prev) => ({ ...prev, [name]: value }));
      if (boyErrors[name]) {
        setBoyErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [boyErrors]
  );

  const handleBoyBlur = useCallback(
    (name: keyof PersonData) => () => {
      setBoyTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, boyData[name]);
      setBoyErrors((prev) => ({ ...prev, [name]: error }));
    },
    [boyData]
  );

  // Girl handlers
  const handleGirlChange = useCallback(
    (name: keyof PersonData) => (value: string) => {
      setGirlData((prev) => ({ ...prev, [name]: value }));
      if (girlErrors[name]) {
        setGirlErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [girlErrors]
  );

  const handleGirlBlur = useCallback(
    (name: keyof PersonData) => () => {
      setGirlTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, girlData[name]);
      setGirlErrors((prev) => ({ ...prev, [name]: error }));
    },
    [girlData]
  );

  const validateAll = (): boolean => {
    let isValid = true;
    const newBoyErrors: FormErrors = {};
    const newGirlErrors: FormErrors = {};

    // Validate boy
    (Object.keys(boyData) as Array<keyof PersonData>).forEach((key) => {
      const error = validateField(key, boyData[key]);
      if (error) {
        newBoyErrors[key] = error;
        isValid = false;
      }
    });

    // Validate girl
    (Object.keys(girlData) as Array<keyof PersonData>).forEach((key) => {
      const error = validateField(key, girlData[key]);
      if (error) {
        newGirlErrors[key] = error;
        isValid = false;
      }
    });

    setBoyErrors(newBoyErrors);
    setGirlErrors(newGirlErrors);

    const allTouched = {
      name: true,
      dateOfBirth: true,
      timeOfBirth: true,
      placeOfBirth: true,
    };
    setBoyTouched(allTouched);
    setGirlTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsSubmitting(true);

    // Store both profiles in sessionStorage
    const matchData = {
      boy: { ...boyData, gender: "male" },
      girl: { ...girlData, gender: "female" },
    };
    sessionStorage.setItem("matchData", JSON.stringify(matchData));

    // Brief delay for UX, then navigate
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Navigate to match results page
    router.push("/match");
  };

  const isBoyValid =
    boyData.name &&
    boyData.dateOfBirth &&
    boyData.timeOfBirth &&
    boyData.placeOfBirth &&
    Object.values(boyErrors).every((e) => !e);

  const isGirlValid =
    girlData.name &&
    girlData.dateOfBirth &&
    girlData.timeOfBirth &&
    girlData.placeOfBirth &&
    Object.values(girlErrors).every((e) => !e);

  const isFormValid = isBoyValid && isGirlValid;

  return (
    <div className="relative min-h-screen overflow-hidden py-12 px-4">
      {/* Floating Zodiac Background */}
      <FloatingZodiacIcons />

      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-cosmic-500/20 border border-white/10"
          >
            <span className="text-5xl">💫</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Cosmic Match Making</span>
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Enter the celestial details of both individuals to discover their cosmic compatibility
          </p>
        </motion.div>

        {/* Two-Column Form */}
        <form onSubmit={handleSubmit}>
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Boy's Details Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <PersonForm
                  title="Groom's Details"
                  icon="👨"
                  accentColor="text-blue-400"
                  data={boyData}
                  errors={boyErrors}
                  touched={boyTouched}
                  onChange={handleBoyChange}
                  onBlur={handleBoyBlur}
                />
              </div>
            </motion.div>

            {/* Girl's Details Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-pink-500/20 shadow-2xl shadow-pink-500/10"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-pink-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <PersonForm
                  title="Bride's Details"
                  icon="👩"
                  accentColor="text-pink-400"
                  data={girlData}
                  errors={girlErrors}
                  touched={girlTouched}
                  onChange={handleGirlChange}
                  onBlur={handleGirlBlur}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Connection Visual */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl"
            >
              💕
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-500" />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto">
            <CosmicButton
              type="submit"
              disabled={!isFormValid || isSubmitting}
              isLoading={isSubmitting}
            >
              ✨ Find Cosmic Compatibility
            </CosmicButton>
          </motion.div>
        </form>

        {/* Footer text */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-white/40 text-sm mt-8"
        >
          Your celestial journey awaits • Powered by ancient Vedic astrology ✦
        </motion.p>
      </motion.div>
    </div>
  );
}
