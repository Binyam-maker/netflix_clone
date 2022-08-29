/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      colors: {
        borderColor: "#222",
        mainRed: "#f40612",
        transBlack: "rgba(0,0,0,30%)",
        transBlack2: "rgba(0,0,0,92%)",
        moreInfo: "rgba(109, 109, 110, 0.70)",
      },
    },
  },
  plugins: [],
};
