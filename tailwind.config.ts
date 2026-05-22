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
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "#141419",
        muted: "#1E1E28",
        border: "#1E1E28",
        "text-primary": "#E8ECF0",
        "text-secondary": "#8A8F98",
        "accent-teal": "#00E5CC",
        "accent-amber": "#FFB800",
        destructive: "#ef4444",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        button: "8px",
        card: "12px",
        tag: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
