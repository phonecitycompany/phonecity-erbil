/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#2e384d',
        'light-grey': '#a4aab8',
        'sky-blue': '#f4f6fc',
        white: '#ffffff',
        'main-light': '#0073d0',
        main: '#2e5bff',
        'main-dark': '#1f3da8',
        'main-transparent': '#0072cf1a',
        red: '#ff6666',
        'red-dark': '#ee5c5c',
        shadow: '#2e5bff4d',
      },
    },
  },
  plugins: [],
};
