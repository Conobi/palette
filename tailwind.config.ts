import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      geomanist: ['"Geomanist"', '"Inter"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'ramage-gray': {
          50: '#fffcf0',
          100: '#f5f4ed',
          200: '#e6e8e6',
          300: '#d2d5d7',
          400: '#9fa3aa',
          500: '#6c727d',
          600: '#4d5463',
          700: '#384152',
          800: '#202838',
          900: '#111826',
          950: '#040915'
        }
      }
    }
  }
}
