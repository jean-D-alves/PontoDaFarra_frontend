import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#F2F2F2",
        surface: "#FAFAFA",
        gold: {
          DEFAULT: "#FFC21A",
          light: "#FFD23F",
          dark: "#dfa300",
        },
        ph: "#D9D9D9",
        muted: "#9CA3AF",
        cardline: "#D1D5DB",
        event: "#E5E5E5",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
