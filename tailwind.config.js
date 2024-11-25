/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Spartan", "sans-serif"],
    },
    colors: {
      background: {
        light: "#F8F8FB",
        dark: "#141625",
        neutral: "#373b53",
      },
      danger: {
        DEFAULT: "#EC5757",
        light: "#9277FF",
      },
      primary: {
        DEFAULT: "#7C5DFA",
        light: "#9277FF",
      },
      secondary: {
        DEFAULT: "#1E2139",
        light: "#252945",
      },
      foreground: {
        100: "#DFE3FA",
        200: "#888EB0",
        300: "#7E88C3",
        400: "#0C0E16",
      },
    },
    extend: {},
  },
  plugins: [],
};
