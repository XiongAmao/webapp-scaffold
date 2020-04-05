const { resolvePath } = require('./utils/index')
const { jsRules } = require('./config/base')
const plugins = require('./config/plugins')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  entry: {
    app: resolvePath('src/index.tsx')
  },
  output: {
    path: resolvePath('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [...jsRules]
  },
  plugins: [
    ...plugins
  ]
}
