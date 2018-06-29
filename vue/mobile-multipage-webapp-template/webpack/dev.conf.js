'use strict'
const path = require('path')
const baseConfig = require('./base.conf')
const config = require('./config')
const postcssConfig = require('./config/postcss.config.js')
const WebpackMerge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const Notifier = require('node-notifier')

const devWebpackConfig = WebpackMerge(baseConfig, {
  devServer: {
    clientLogLevel: 'warning',
    // historyApiFallback: true,  // 开启后会忽略默认路径下的目录展示功能，未开启时，如果默认路径下没匹配到index.html 则会打开webpack目录展示
    hot: true,
    watchContentBase: true,
    compress: true,
    contentBase: config.base.outputPath,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpen,
    publicPath: config.dev.assetsPublicPath,
    quiet: true,
    proxy: config.dev.proxy
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader?sourceMap',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader?sourceMap',
          'css-loader?sourcMap',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig
            }
          },
          'less-loader?sourceMap'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader?sourceMap',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig
            }
          },
          'sass-loader?sourceMap',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: config.prod.sassMixinPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`]
      },
      onErrors: () => {
        return (serverity, errors) => {
          const error = errors[0]
          const filename = error.file && error.file.split('!').pop

          Notifier.notify({
            title: '',
            message: serverity + ':' + error.name,
            subtitle: filename || ''
          })
        }
      }
    })
  ]
})

module.exports = devWebpackConfig
