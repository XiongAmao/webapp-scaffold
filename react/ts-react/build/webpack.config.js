const { resolvePath } = require('./utils/index')
const { jsRules } = require('./config/base')
const cssRules = require('./config/css')
const plugins = require('./config/plugins')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  // mode: 'development',
  devtool: 'eval-cheap-module-source-map', // only for dev
  entry: {
    app: resolvePath('src/index.tsx')
  },
  output: {
    path: resolvePath('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [...jsRules, ...cssRules]
  },
  plugins: [...plugins],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json'],
    alias: {
      '@': resolvePath('src/')
    }
  }
}
