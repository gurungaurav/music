/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#121212",
        secondaryColor: "#b3b3b3",
        hoverColor: "#262626",
      },
    },
  },
  plugins: [],
};
