/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#3b82f6 ",
        secondary: "#c084fc",
        darkBlue: "#172554 ",
        lightBlue: "#93c5fd ",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
