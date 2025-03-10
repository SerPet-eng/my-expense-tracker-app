/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s ',
      },
      keyframes: { // Move keyframes here
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' }, // Corrected 'tranform' to 'transform' and added '%'
          '100%': { opacity: 1, transform: 'translateY(0px)' }, // Same as above
        },
      },
    },
  },
  plugins: [],
};
