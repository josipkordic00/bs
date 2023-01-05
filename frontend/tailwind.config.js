/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF69B4", // pink
        dark: "#333333", // dark grey
        light: "#F5F5F5", // light grey
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
