'use strict'
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('./config')

function getEntries(globPath, rootEntires = []) {
  const srcDir = path.join(__dirname, '../')      // 获取src所在目录
  const viewsDir = path.join(srcDir, 'src/views') // 取view路径
  const files = glob.sync(path.join(srcDir, globPath)) // 匹配完整路径

  let entries = {}

  /**
   * views 配置形式
   * 一级子目录会输出到打包后的目录的根目录
   * 例如
   * input: views/homepage/homepage.html
   * ouput: dist/homepage/homepage.html
   *
   * input: views/homepage/about/about.html
   * outpu: dist/homepage/about/about.html
   *
   * 如果配置了rootEntries文件，则对应的html模板会放在打包文件的根目录下
   * 一般用于配置index.html
   */
  files.forEach(filePath => {
    const extName = path.extname(filePath) // 文件名后缀
    const baseName = path.basename(filePath) // 文件名
    const fileName = path.basename(filePath, extName) // 文件名.后缀
    const relativePath = path.relative(viewsDir, filePath)
    const split = filePath.split('/')

    if (split[split.length - 2] === fileName) { // 文件名和目录匹配时
      let name

      if (rootEntires && rootEntires.length > 0) {
        let match

        rootEntires.forEach(matchPath => {
          match = relativePath === `${matchPath}.js` || relativePath === `${matchPath}.html`
        })

        if (match) {
          name = relativePath.replace('/' + baseName, '')
        } else {
          name = relativePath.replace(extName, '')
        }
      } else {
        name = relativePath.replace(extName, '')
      }

      entries[name] = './' + path.relative(srcDir, filePath)  // webpack已配置context, 这里拼相对路径
    }
  })

  return entries
}

const getHtmlPlugins = (views, entries) => {
  const htmlPluginConfigs = []
  Object.keys(views).forEach((chunkName) => {
    const config = {
      filename: `${chunkName}.html`,
      favicon: webpackConfig.base.favicon,
      template: views[chunkName],
      title: webpackConfig.base.templateTitle,
      inject: true,
      chunks: ['vendor', 'common'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }

    if (chunkName in entries) {
      config.chunks.unshift(chunkName)
    }

    htmlPluginConfigs.push(new HtmlWebpackPlugin(config))
  })

  return htmlPluginConfigs
}

const assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? webpackConfig.prod.assetsSubDirectory
    : webpackConfig.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
  // 猜测原因是需要保证输出的资源路径是POSIX风格，原因是URL路径是POSIX
  // 看源码上是一个用户提供的window下路径问题的解决方案
}

module.exports = {
  getEntries,
  getHtmlPlugins,
  assetsPath
}
