/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: '#2a2a2a',
        black: "#313338",
        midDark: '#2b2d31',
        coal: "#1e1f22",
        white: "#cdcfd2",
        frostWhite: '#FFFFFF',
        blue: '#5865f2',
        lightBlue: '#0798e2',
      },

      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
