/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // darkmode: 'class',
  theme: {
    extend: {
      colors:{
        'custom-blue': '#00C5C5',
      },
      fontFamily:{
        sans: ['Proxima Nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

