/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      lg: '1024px', // 1024px 이상
      xl: '1280px', // 1280px 이상
    },
    extend: {
      maxWidth: {
        // 커스텀 최대 너비
        '8xl': '88rem', // 1408px
        '9xl': '96rem', // 1536px
        container: '1200px', // 원하는 크기
      },
      fontFamily: {
        // 기본 폰트를 Spoqa Han Sans Neo로 변경
        sans: ['Spoqa Han Sans Neo', 'system-ui', 'sans-serif'],
        // Spoqa 폰트 별칭
        spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
