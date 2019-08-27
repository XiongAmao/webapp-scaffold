module.exports = () => {
  return {
    plugins: [
      require('autoprefixer')()

      // px to vw plugin or use sass mixin

      // require('postcss-px-to-viewport')({
      //   viewportWidth: 375,
      //   unitPrecision: 3,
      //   selectorBlackList: ['ignore'],
      //   minPixelValue: 1
      // })
    ]
  }
}
