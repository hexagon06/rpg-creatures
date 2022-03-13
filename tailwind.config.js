const Color = require('color')
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string()

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brown': '#392F24',
        'purple': '#9C4DD1',
        'dark-blue': '#252439',
        'dark-blue-light': lighten('#252439', .7),
        'gold': '#D1B74D',
        'rouge': '#85424E',
      },
      transitionProperty: {
        'border-radius': 'border-radius',
        'width':'width',
        'padding':'padding',
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px',
      'large': '12px',
      'huge': '107px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
