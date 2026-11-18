/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f8', // Soft background white-pink
          100: '#FFD1DC', // Primary pastel pink
          200: '#fbcfe8',
          500: '#ec4899',
        }
      },
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
}