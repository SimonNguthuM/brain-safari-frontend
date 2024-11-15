/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          light: '#4fd1c5',
          DEFAULT: '#38b2ac',
          dark: '#285e61',
        },
        coral: {
          light: '#ff8a65',
          DEFAULT: '#ff6f61',
          dark: '#d84315',
        },
      },
    },
  },
  plugins: [],
}
