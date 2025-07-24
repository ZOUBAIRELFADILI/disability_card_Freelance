/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'uae-red': '#FF0000',
        'uae-green': '#00843D',
        'uae-black': '#000000',
        'uae-white': '#FFFFFF',
      },
      animation: {
        'card-flip': 'card-flip 3s ease-in-out infinite',
        'card-3d': 'card-3d-rotate 6s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};