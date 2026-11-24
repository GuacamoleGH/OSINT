import type { Config } from "tailwindcss";

function withOpacity(variableName: string): any {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

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
          deep: withOpacity("--bg-deep"),
          base: withOpacity("--bg-base"),
          card: withOpacity("--surface-card"),
          hover: withOpacity("--surface-hover"),
          elevated: withOpacity("--surface-elevated"),
          input: withOpacity("--surface-input"),
          border: withOpacity("--border-subtle"),
          green: withOpacity("--accent-green"),
          turquoise: withOpacity("--accent-turquoise"),
          emerald: withOpacity("--accent-emerald"),
          cyan: withOpacity("--accent-cyan"),
          amber: withOpacity("--accent-amber"),
          rose: withOpacity("--accent-rose"),
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
