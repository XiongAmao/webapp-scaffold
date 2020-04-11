const { resolvePath } = require('../utils/index')
const { cacheLoader, threadLoader } = require('./cache')

const jsRules = [
  {
    test: /\.(j|t)sx?$/,
    include: resolvePath('src'),
    use: [
      cacheLoader,
      threadLoader(),
      {
        loader: 'babel-loader'
      }
    ]
  }
]

const plugins = []

module.exports = {
  jsRules
}
