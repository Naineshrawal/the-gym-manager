/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#ef476f',
          secondary: '#ffd166',
          accent: '#06d6a0',
          neutral: '#118ab2',
          dark: '#073b4c',
        }
      },
      backgroundImage:{
        hero: 'url("/images/gym-hero-bg.png")'
      },
      
    },
  },
  plugins: [],
}
