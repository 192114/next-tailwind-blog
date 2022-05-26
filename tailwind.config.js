const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // 重命名
        primary: colors.indigo,
        gray: colors.neutral,
      },
      gridTemplateRows: {
        // 文章详情响应式布局
        'auto-1fr': 'auto 1fr',
      }
    },
  },
  plugins: [],
}
