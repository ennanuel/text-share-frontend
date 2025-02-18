/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat'"
      },
      fontWeight: {
        normal: 500
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    },
  },
  plugins: [],
}

