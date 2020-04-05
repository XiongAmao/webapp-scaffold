const HtmlWebpackPlugin = require('html-webpack-plugin')

const { resolvePath } = require('../utils/index')

module.exports = [
  new HtmlWebpackPlugin({
    template: resolvePath('build/template/index.html'),
    inject: true
  })
]
