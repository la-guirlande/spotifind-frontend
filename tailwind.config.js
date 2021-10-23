module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'gotham-black': ['Gotham-Black'],
        'gotham-medium': ['Gotham-Medium'],
        'gotham-book': ['Gotham-Book'],
        'gotham-bold': ['Gotham-Bold']
      },
      spacing: {
        '18': '4.5rem'
      },
      colors: {
        primary: {
          light: '#9752FF',
          DEFAULT: '#6900FF',
          dark: '#310275'
        },
        secondary: {
          light: '#FDD463',
          DEFAULT: '#F1B50F',
          dark: '#C38E02'
        },
        light: '#F5F3F9',
        dark: '#2D2D2F',
        info: {
          light: '#6FE4FF',
          DEFAULT: '#14D4FF',
          dark: '#039FC3'
        },
        warn: {
          light: '#F98F5C',
          DEFAULT: '#EA5A17',
          dark: '#A63E0E'
        },
        error: {
          light: '#EA493B',
          DEFAULT: '#DC2618',
          dark: '#9E1005'
        }
      },
      transitionProperty: {
        border: 'border'
      },
      transitionDuration: {
        '50': '50ms'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      opacity: ['disabled'],
      scale: ['disabled'],
      backgroundColor: ['disabled'],
      backgroundOpacity: ['disabled'],
      cursor: ['hover', 'disabled']
    },
  },
  plugins: [],
}
