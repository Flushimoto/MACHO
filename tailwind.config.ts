import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        ink: "#1a1a1a",
        "ink-secondary": "#2a2a2a",
        "macho-red": "#FF3333",
        "macho-orange": "#FF8A00",
        "off-white": "#F5F5F5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        'macho': '0 4px 14px 0 rgba(255, 51, 51, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
