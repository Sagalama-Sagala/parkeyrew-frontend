/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans"], // Replace 'Inter' with your desired sans-serif font
      },
      colors: {
        primary: "#204E8F",
        secondary: "#F0F0F0",
        tertiary: "#FDCF75",
        peach: "#FF6251",
      },
    },
  },
  plugins: [],
};
