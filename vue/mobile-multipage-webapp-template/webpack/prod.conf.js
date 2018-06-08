'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./base.conf')
const config = require('./config')
const postcssConfig = require('./config/postcss.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const prodWebpackConfig = WebpackMerge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig
            }
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: config.prod.sassMixinPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new CleanWebpackPlugin([config.base.outputPath], {
      allowExternal: true
    })
  ],
  optimization: {
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false,
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      // 用于优化css文件
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        //
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000,
          minChunks: 1,
          chunks: 'all', //
          priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        // 项目公共代码
        commons: {
          test: /[\\/]src[\\/]libs[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      }
    }
  }
})

if (config.prod.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prodWebpackConfig
