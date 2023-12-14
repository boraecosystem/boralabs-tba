/* eslint-env node */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PR', ...defaultTheme.fontFamily.sans]
      }
    },
    fontFamily: {
      PR: ['PR'],
      PM: ['PM'],
      PB: ['PB']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      // 'corporate',
      {
        mytheme: {
          primary: '#5b33e0',
          secondary: '#5ebdf5',
          neutral: '#9790be',
          'base-content': '#1e232a',
          'base-100': '#ffffff',

          // focus
          'primary-focus': '#4b25c8',
          'secondary-focus': '#479dcf',

          // text color
          'primary-content': '#ffffff',
          'secondary-content': '#1e232a'
        }
      }
    ]
  }
};
