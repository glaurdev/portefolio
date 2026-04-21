import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F4EEE0",
        cream: "#EDE5CE",
        ink: "#1C1814",
        charcoal: "#2E2924",
        gold: "#C09850",
        "gold-light": "#D4B87A",
        stone: "#7A6E5F",
        muted: "#A89B88",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)",  "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
