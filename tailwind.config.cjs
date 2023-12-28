/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html, css, js}"],
  theme: {
    container: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "970px",
      },
    },
    extend: {
      screens: {
        print: { raw: "print" },
      },
      fontFamily: {
        display: ['"Montserrat"', "sans-serif"],
        body: ['"Lato"', "sans-serif"],
      },
      fontSize: {
        xxs: "0.6875rem",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        "custom-black": "#2F2F2F",
        // ...color-name: color-code (hex/hsl/rgb/rgba/hsla...)
      },
    },
  },
  plugins: [
    // add your tailwind plugins
  ],
};
