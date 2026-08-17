/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studioDark: '#090A0F',
        studioCard: '#0F172A',
        neonPurple: '#8B5CF6',
        neonPink: '#EC4899',
        neonCyan: '#06B6D4',
        neonGold: '#F59E0B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Encode Sans Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
