/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  //darMode: "class" -> class에서 지정한대로 다크모드 따라가겠다.
  //"media" -> 브라우저 환경설정에 따라가겠다.
  plugins: [require("@tailwindcss/forms")],
};
