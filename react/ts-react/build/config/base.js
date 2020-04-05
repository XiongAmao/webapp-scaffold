const { resolvePath } = require('../utils/index')

const jsRules = [
  {
    test: /\.(j|t)sx?$/,
    include: resolvePath('src'),
    use: [
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
