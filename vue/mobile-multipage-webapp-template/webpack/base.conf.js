'use strict'
const os = require('os')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')

const utils = require('./utils')
const config = require('./config')

const entries = utils.getEntries(config.base.JsEntries, config.base.rootEntires)
const views = utils.getEntries(config.base.HTMLEntries, config.base.rootEntires)
const htmlPlugins = utils.getHtmlPlugins(views, entries)
entries['vendor'] = config.base.vendorList // 配置长缓存库

// 线程池
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const resolve = (src) => {
  return path.resolve(__dirname, src)
}

module.exports = {
  mode: process.env.NODE_ENV,
  context: resolve('../'),
  entry: entries,
  output: {
    path: config.base.outputPath,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].chunk.js', // dev环境不能配置为[chunkhash]
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.prod.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', 'vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        include: [resolve('../src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        loader: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            name: utils.assetsPath('imgs/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      /* webpack@4 + vue-loader@15 使用方法
       * 新的vue-loader 不再需要在联立 css-loader之类的loader
       * 引入plugin和 loader后，在处理.vue文件后会转交其他配置的loader 处理
       */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        //
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minSize: 30000,
          minChunks: 1,
          chunks: 'all', //
          priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        // 项目公共代码
        common: {
          test: /[\\/]src[\\/]libs[\\/]/,
          name: 'common',
          minSize: 30000,
          minChunks: 3,
          chunks: 'all',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      }
    }
  },
  plugins: [
    ...htmlPlugins,
    new VueLoaderPlugin(),  // Vueloader@15 需要引入Vue plugin

    // 多线程打包
    new HappyPack({
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}
