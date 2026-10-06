/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-pink': '#E85D75',
        'blush-pink': '#FFD6E0',
        'lavender': '#C8B6FF',
        'cream': '#FFF9F5',
        'charcoal': '#2D2D2D',
        'success': '#52B788',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
