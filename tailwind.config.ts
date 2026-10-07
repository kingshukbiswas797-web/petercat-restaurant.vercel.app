import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peter: {
          black: "#0A0A0A",
          charcoal: "#1A1A1A",
          gold: "#D4AF37",
          brass: "#B5A642",
          offwhite: "#F5F5DC",
          crimson: "#8B0000",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair-display)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
