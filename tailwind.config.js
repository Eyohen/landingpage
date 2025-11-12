/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesque: ['var(--font-grotesque)'],
      },
      colors: {
        'light-purple': '#8a6bc6',
        'dark-color': '#17171a',
        'text-purple': '#7042d2',
      },
      width: {
        '3xl': '48rem',
      },
    },
  },
  plugins: [],
}
