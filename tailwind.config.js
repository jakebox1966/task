/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      lg: '1024px', // 1024px 이상 1280px 미만
      xl: '1280px', // 1280px 이상
    },
    extend: {},
  },
  plugins: [],
}
