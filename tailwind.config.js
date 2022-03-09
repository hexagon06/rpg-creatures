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
        'gold': '#D1B74D',
        'rouge': '#85424E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
