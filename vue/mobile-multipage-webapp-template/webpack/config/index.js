'use strict'
const path = require('path')

module.exports = {
  base: {
    templateTitle: '',
    favicon: path.resolve(__dirname, '../../src/assets/imgs/favicon.ico'),
    JsEntries: './src/views/**/*.js',
    HTMLEntries: './src/views/**/*.html',

    /*
     * 设置该项将使对应的入口文件放置到打包的根目录
     * 这里请不要配置文件后缀
     * 即 views/index/index.js 配置为 index/index
     * 生成的路径为: /index.html
     * 如果不配置则与 views目录结构相同: /index/index.html
     */
    rootEntires: [
      // 'index/index'
    ],
    outputPath: path.resolve(__dirname, '../../dist'),
    venderList: ['vue']
  },

  dev: {
    sourceMap: true,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    port: 9001,
    host: '0.0.0.0',
    autoOpen: false,
    proxy: {

    },
    sassMixinPath: [
      path.resolve(__dirname, '../../src/assets/sass/mixin.scss'),
      path.resolve(__dirname, '../../src/assets/sass/svg.scss')
    ]
  },

  prod: {
    sourceMap: false,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    sassMixinPath: [
      path.resolve(__dirname, '../../src/assets/sass/mixin.scss'),
      path.resolve(__dirname, '../../src/assets/sass/svg.scss')
    ],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
