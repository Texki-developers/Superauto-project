/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './styles/*.css', './src/**/*.{js,ts,jsx,tsx}'],
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3e5fc',
          100: '#aab1f5',
          300: '#4C5CE9',
          400: '#384ae7',
          500: '#182ac7',
          600: '#111e8e',
        },
        successGreen: '#4BB543',
        failureRed: '#FC100D',
        gray: {
          50: '#f2f2f3',
          100: '#F0F0F5',
          200: '#F3F3F3',
          300: '#CFCFCF',
        },
        black: {
          100: 'rgba(25, 25, 25, 0.3)',
          200: '#808080',
          300: '#191919',
          400: '#000',
        },
        white: {
          100: '#fff',
        },
      },
    },
  },
  plugins: [],
};
