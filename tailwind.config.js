/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,css}"],
  theme: {
    screens: {
      sm: '400px',
      md: '768px',
      lg: '1024px'
    },
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

