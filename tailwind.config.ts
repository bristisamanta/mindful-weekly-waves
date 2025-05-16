
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        nunito: ["'Nunito'", "sans-serif"],
      },
      colors: {
        background: "#f8f9fd",
        card: "#fff",
        primary: { DEFAULT: "#9b87f5" }, // Purple
        accent: { DEFAULT: "#D6BCFA" }, // Light Purple
        moodHappy: "#FDE68A", // Yellow
        moodSad: "#B6E0FE", // Light Blue
        moodAngry: "#FEB2B2", // Pinkish Red
        moodNeutral: "#D1D5DB", // Gray
        moodCalm: "#D6F5E3", // Mint Green
        graySoft: "#F1F0FB",
        tag: "#FFDEE2",
        text: "#1A1F2C",
      },
      borderRadius: {
        lg: "1.5rem",
        card: "1.25rem",
      },
      boxShadow: {
        glass: "0 4px 32px -4px rgba(155, 135, 245, 0.15)",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        bounce: "bounce 0.7s",
        fadeIn: "fadeIn 0.4s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
