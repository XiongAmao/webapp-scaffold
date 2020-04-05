const { resolvePath } = require('./utils/index')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  entry: {
    app: resolvePath('src/index.ts')
  },
  output: {
    path: resolvePath('dist'),
    filename: '[name].js'
  },
  module: {
    
  }
}
