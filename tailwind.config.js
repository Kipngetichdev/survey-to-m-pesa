/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#1E3A8A',
          light: '#60A5FA',
          dark: '#172554',
          contrast: '#FFFFFF',
        },
        secondary: {
          main: '#4B5563',
          light: '#D1D5DB',
          dark: '#374151',
          contrast: '#111827',
        },
        accent: {
          main: '#10B981',
          light: '#6EE7B7',
          dark: '#047857',
        },
      },
    },
  },
  plugins: [],
}