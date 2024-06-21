/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Arial", "sans-serif"],
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        primary: "#4349FF",
        primaryDark: "#2A2FBA",
        primaryLight: "#A4A7FF",
        black: "#0A0C1C",
        black2: "#2E3758",
        white: "#ffffff",
        grey: "#7C7F9A",
        greyFont: "#767CA7",
        bgDark: "#0000000D",
        pink: "#FEB2B6",
        pinkLight: "#FFC5C8",

      },
      backgroundImage: {
        "main-bg": "url('/src/images/background.svg')",
      },
      dropShadow: {
        lg: "0 10px 8px rgba(67, 73, 255, 0.25)",
      },
    },
  },
  plugins: [],
}
