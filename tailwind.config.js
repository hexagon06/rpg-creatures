const Color = require("color");
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: "#392F24",
        "brown-light": lighten("#392F24", 0.7),
        "brown-dark": darken("#392F24", 0.3),
        purple: "#9C4DD1",
        "dark-blue": "#252439",
        "dark-blue-light": lighten("#252439", 0.7),
        gold: "#D1B74D",
        "gold-light": lighten("#D1B74D", 0.7),
        "gold-dark": darken("#D1B74D", 0.3),
        rouge: "#85424E",
        "rouge-light": lighten("#85424E", 0.7),
        "rouge-dark": darken("#85424E", 0.3),
      },
      transitionProperty: {
        "border-radius": "border-radius",
        width: "width",
        padding: "padding",
      },
      skew: {
        30: "30deg",
        35: "35deg",
        40: "40deg",
        45: "45deg",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.5)",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
      large: "12px",
      huge: "107px",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("tw-elements/dist/plugin"),
  ],
};
