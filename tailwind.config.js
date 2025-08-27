/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "macho-orange": "#FFA500",
        "ink": "#0A0A0A",
        "ink-secondary": "#1A1A1A",
        "off-white": "#F5F5F5",
        "background": "#000000"
      }
    }
  },
  plugins: []
};
