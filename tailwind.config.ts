import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette for AstroMatchMaking
      colors: {
        primary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        cosmic: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Deep space background colors
        space: {
          dark: "#0a0a1a",
          deeper: "#050510",
          accent: "#1a1a3a",
        },
      },
      // Custom fonts
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      // Animation timing functions
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        cosmic: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      // Custom animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px theme('colors.primary.500'), 0 0 20px theme('colors.primary.500')" },
          "100%": { boxShadow: "0 0 20px theme('colors.primary.500'), 0 0 40px theme('colors.primary.500')" },
        },
      },
      // Background images for cosmic theme
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cosmic-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "stars-pattern": "radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent)",
      },
      // Custom spacing
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      // Border radius
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      // Box shadow
      boxShadow: {
        glow: "0 0 20px rgba(217, 70, 239, 0.3)",
        "glow-lg": "0 0 40px rgba(217, 70, 239, 0.4)",
        cosmic: "0 4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
      },
      // Backdrop blur
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
