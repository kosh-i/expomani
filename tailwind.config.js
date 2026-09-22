/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manipur: {
          emerald: '#059669',
          darkEmerald: '#064e3b',
          ruby: '#be123c',
          gold: '#d97706',
          teal: '#0d9488',
          sand: '#fef3c7',
          night: '#0f172a',
          slate: '#1e293b',
          accent: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
