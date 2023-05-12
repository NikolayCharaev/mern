/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        appBg: '#212121',
        cardBg: '#404b62',
        fullCardBg: '#09092d',
      },
    },
  },
  plugins: [],
};
