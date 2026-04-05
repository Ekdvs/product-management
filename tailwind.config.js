/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: { extend: {} },
  plugins: [],
};