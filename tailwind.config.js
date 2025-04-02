/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: "#0F172A",
        blackoutlines: "#939393",
        blue: "6998FF",
        light: "#F2F2F7",
      },
    },
  },
  plugins: [],
};
