/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["Spartan", "sans-serif"],
    },
    colors: {
      white: "#FFF",
      black: {
        DEFAULT: "#141625", // Dark
        light: "#0C0E16",
      },
      neutral: {
        100: "#F8F8FB", // Light background
        200: "#DFE3FA", // Foreground 100
        300: "#888EB0", // Foreground 200
        400: "#7E88C3", // Foreground 300
        500: "#373b53", // Neutral
        600: "#494E6E", // Separator
      },
      primary: {
        DEFAULT: "#7C5DFA",
        light: "#9277FF",
      },
      secondary: {
        DEFAULT: "#1E2139",
        light: "#252945",
      },
      danger: {
        DEFAULT: "#EC5757",
        light: "#9277FF",
      },
    },
    letterSpacing: {
      tightest: "-0.75px",
      tight: "-0.25px",
      normal: "-0.1px",
      wide: "0.05em",
      widest: "0.25em",
    },
    extend: {
      fontSize: {
        sm: ["13px", "15px"],
        base: ["15px", "24px"],
      },
    },
  },
  plugins: [],
};
