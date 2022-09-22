// @ts-nocheck
/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wcs-pink": "#f76c6c",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("aria-selected-true", ({ modifySelectors, separator }) => {
        modifySelectors = ({ className }) => {
          return `.${e(
            `aria-selected-true${separator}${className}`
          )}[aria-selected='true']`;
        };
      }),
        addVariant("aria-selected-false", ({ modifySelectors, separator }) => {
          modifySelectors = ({ className }) => {
            return `.${e(
              `aria-selected-false${separator}${className}`
            )}[aria-selected='false']`;
          };
        });
    }),
  ],
};
