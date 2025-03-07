/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      primary: "#a8c7fa",
      white: "#fff",
    },
    extend: {
      fontFamily: {
        'sans': ['IranSans'],
        'icon': ['Icomoon']
      }
    },
  },
  plugins: [],
}

