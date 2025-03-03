/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'card': 'var(--card)'
       },                     
       fontFamily: {
        sans: ['Proxima Nova', 'sans-serif'],
        body: ['Roboto Flex', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

