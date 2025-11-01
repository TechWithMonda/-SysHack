/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        syshack: {
          primary: '#1a365d',
          secondary: '#2d3748',
          accent: '#e53e3e'
        }
      }
    },
  },
  plugins: [],
}