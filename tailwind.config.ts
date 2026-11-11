import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        muted: "hsl(var(--muted))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        primary: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          light: "#22d3ee",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cal)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      animation: {
        blob: "blob 12s infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99, 102, 241, 0.5)",
        "glow-cyan": "0 0 40px -10px rgba(6, 182, 212, 0.5)",
        card: "0 4px 24px -4px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
