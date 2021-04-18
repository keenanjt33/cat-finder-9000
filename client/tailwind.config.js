module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#D1BE9C',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
