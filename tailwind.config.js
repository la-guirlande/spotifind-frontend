module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'gotham-black': ['Gotham-Black'],
        'gotham-medium': ['Gotham-Medium'],
        'gotham-book': ['Gotham-Book'],
        'gotham-bold': ['Gotham-Bold']
      },
      colors: {
        primary: '#6900FF',
        secondary: '#FFD700',
        light: '#FAF7FF',
        dark: '#41236D',
        info: '#14D4FF',
        warn: '#FFAA17',
        error: '#D63E13'
      },
      borderWidth: {
        '1': '1px'
      },
      transitionDuration: {
        '50': '50ms'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus']
    },
  },
  plugins: [],
}
