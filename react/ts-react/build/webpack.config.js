const { resolvePath } = require('./utils/index')
const { jsRules } = require('./config/base')
const cssRules = require('./config/css')
const plugins = require('./config/plugins')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  // mode: 'development',
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
  plugins: [...plugins]
}
