const plugin = require("tailwindcss/plugin");

const transform3d = plugin(({ addUtilities }) => {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".transform-style": {
      "transform-style": "preserve-3d",
    },
    ".backface-visibility": {
      "backface-visibility": "hidden",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [transform3d],
};
