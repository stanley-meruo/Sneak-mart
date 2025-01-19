/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      parkisans: ["Parkinsans", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#c084fc",
        darkBlue: "#172554 ",
        lightBlue: "#93c5fd ",
      },
      screens: {
        xs: "480px",
        xxl: "1500px",
      },
    },
  },
  plugins: [],
};

