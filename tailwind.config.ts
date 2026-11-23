import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        guacamole: {
          deep: "#0c0e12",
          base: "#12151b",
          card: "#181d26",
          hover: "#1f2532",
          elevated: "#262d3d",
          input: "#0f131a",
          border: "#222a38",
          green: "#00f59b",
          turquoise: "#00d9c4",
          emerald: "#10b981",
          cyan: "#06b6d4",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
        hover: "0 8px 30px -4px rgba(0, 245, 155, 0.12)",
        glow: "0 0 25px -5px rgba(0, 245, 155, 0.25)",
        "glow-cyan": "0 0 25px -5px rgba(0, 217, 196, 0.25)",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
