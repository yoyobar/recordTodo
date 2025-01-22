/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        cursor: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        cursor: 'cursor 1s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'], // Pretendard를 기본 sans-serif로 추가
      },
      colors: {
        primary: {
          light: '#B5EC66',
          DEFAULT: '#8AFF05',
          dark: '#0D1600',
        },
        grayscale: {
          'gray-200': '#BEBEBE',
          'gray-400': '#737373',
          'gray-600': '#393939',
          'gray-800': '#191919',
          black: '#000000',
        },
        literal: {
          error: '#FF4545',
          angry: '#FF3F3F',
          joy: '#FF953F',
          happy: '#FFD250',
          sorrow: '#3F61FF',
          worry: '#7A53FF',
        },
      },
    },
  },
  plugins: [],
};
