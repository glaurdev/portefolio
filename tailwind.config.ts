import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        apple: {
          black:   "#000000",
          surface: "#1D1D1F",
          white:   "#F5F5F7",
          t2:      "#86868B",
          t3:      "#6E6E73",
          blue:    "#0071E3",
          "blue-l":"#2997FF",
        },
      },
      fontFamily: {
        apple: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
