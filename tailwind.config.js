/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      colors: {
        // 🎨 Your original palette
        "macho-orange": "#FFA500",
        "ink": "#0A0A0A",
        "ink-secondary": "#151515",
        "off-white": "#F5F5F5",
        "background": "#000000",

        // 🎨 New custom palette you requested
        navbar: "#1a1a1acc",     // Navbar background
        hero: "#0A0A0A",         // Hero section background
        "button-bg": "#ff3333",  // Button background
        "button-text": "#FFFFFF",// Button text
        text: "#F5F5F5",         // General text
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(255,165,0,0.06)",
        card: "0 10px 25px rgba(0,0,0,0.35)",
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
    },
  },
  plugins: [],
};
