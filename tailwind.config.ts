import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1557A0",
          hover: "#0E4580",
          light: "#E8F1FA",
          50: "#F0F6FC",
        },
        navy: {
          DEFAULT: "#0A2E52",
          90: "rgba(10, 46, 82, 0.9)",
          70: "rgba(10, 46, 82, 0.7)",
        },
        teal: {
          DEFAULT: "#0B7B6B",
          hover: "#096358",
          light: "#E6F5F2",
        },
        alert: {
          DEFAULT: "#B54708",
          light: "#FEF3E6",
        },
        surface: "#F6F7F9",
        background: "#FAFBFE",
        success: "#0D7C4A",
        text: {
          primary: "#1A1A2E",
          secondary: "#4A5568",
          tertiary: "#718096",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-md": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        overline: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "section-desktop": "96px",
        "section-mobile": "48px",
        "container-padding": "24px",
      },
      maxWidth: {
        article: "680px",
        container: "1280px",
        content: "720px",
      },
      borderRadius: {
        card: "10px",
        button: "8px",
      },
      boxShadow: {
        navbar: "0 2px 16px rgba(10, 46, 82, 0.08)",
        card: "0 4px 12px rgba(10, 46, 82, 0.08)",
        "card-hover": "0 8px 32px rgba(10, 46, 82, 0.14)",
        float: "0 12px 40px rgba(10, 46, 82, 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.33%)" },
        },
        "skin-scan-sheen": {
          "0%": { opacity: "0.2" },
          "50%": { opacity: "0.55" },
          "100%": { opacity: "0.2" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        "skin-scan-sheen": "skin-scan-sheen 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
