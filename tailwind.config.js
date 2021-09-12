module.exports = {
  purge: [
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.ts",
    "./components/**/*.jsx",
    "./components/**/*.tsx",
    "./public/**/*.html",
  ],
  options: {
    safelist: [".test"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
