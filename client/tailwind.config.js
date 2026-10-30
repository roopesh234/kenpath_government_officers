/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gov: {
          black: '#0f172a',
          dark: '#1e293b',
          light: '#f8fafc',
          border: '#e2e8f0',
          blue: '#2563eb',
          'blue-dark': '#1d4ed8',
          'blue-light': '#eff6ff',
          green: '#16a34a',
          'green-dark': '#15803d',
          'green-light': '#f0fdf4',
          red: '#dc2626',
          'red-dark': '#b91c1c',
          'red-light': '#fef2f2',
        },
      },
      fontFamily: {
        telugu: ['"Noto Sans Telugu"', '"Gautami"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
