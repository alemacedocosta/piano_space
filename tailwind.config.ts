import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Piano space palette
        primary: {
          DEFAULT: "#75B390",
          light: "#D6EDE0",
          dark: "#4A8A66",
        },
        sand: {
          DEFAULT: "#F0DDAA",
          light: "#FAF3E0",
          dark: "#D9C07A",
        },
        accent: {
          DEFAULT: "#E47C5D",
          light: "#FAE8E2",
          dark: "#C05A3A",
        },
        crimson: {
          DEFAULT: "#E32D40",
          light: "#FAD5D9",
        },
        navy: {
          DEFAULT: "#152B3C",
          light: "#E8EDF1",
          medium: "#2C4A60",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "piano-key": "0 4px 6px -1px rgba(21,43,60,0.15), 0 2px 4px -1px rgba(21,43,60,0.1)",
        "piano-key-pressed": "0 1px 3px rgba(21,43,60,0.2)",
        card: "0 1px 3px rgba(21,43,60,0.08), 0 1px 2px rgba(21,43,60,0.06)",
        "card-hover": "0 4px 12px rgba(21,43,60,0.12), 0 2px 4px rgba(21,43,60,0.08)",
      },
      borderRadius: {
        key: "0 0 6px 6px",
      },
      animation: {
        "key-press": "keyPress 0.1s ease-in-out",
        "streak-pulse": "streakPulse 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        keyPress: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(3px)" },
          "100%": { transform: "translateY(0)" },
        },
        streakPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
