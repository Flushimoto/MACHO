/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "macho-orange": "#FFA500",
        "ink": "#0A0A0A",
        "ink-secondary": "#151515",
        "off-white": "#F5F5F5",
        "background": "#000000"
      }
    }
  },
  plugins: []
};
