const path = require('path')
const createPages = require('./utils/create-pages')
const { allChunksOption, defaultChunksOption } = require('./chunks.config')

const resolve = (src) => path.resolve(process.cwd(), src)

const isProdEnv = process.env.NODE_ENV === 'production'

const pages = createPages({
  allChunksOption,
  defaultChunksOption,
  excludeEntries: isProdEnv ? ['**/pages/test/**/main.js'] : []
})

const config = {
  publicPath: '/',
  outputDir: resolve('./dist'),
  pages,
  alias: {
    '@': resolve('./src')
  }
}

const globalVars = {
  __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
  __PUBLIC_PATH__: JSON.stringify(config.publicPath),
  __DEV_TOKEN__: !isProdEnv ? JSON.stringify('') : JSON.stringify('')
  // this token is used in local dev mode
}

module.exports = Object.assign(config, { globalVars })
