/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DA4F28",
        accent: "#E2C056",
        textmain: "#222",
        bordermain: "#b0aeaa",
      },
      animation: {
        'spin-slow': 'spin 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

