'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConfig = require('./base.conf')
const customConfig = require('./config')
const postcssConfig = require('./config/postcss.config.js')
const uglifyOptions = require('./config/uglifyOptions')

const prodWebpackConfig = WebpackMerge(baseConfig, {
  mode: 'production',
  devtool: customConfig.prod.sourceMap ? 'source-map' : false,
  output: {
    path: customConfig.base.outputPath,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? customConfig.prod.assetsPublicPath
        : customConfig.dev.assetsPublicPath
  },
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
              resources: customConfig.prod.sassMixinPath
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
    new CleanWebpackPlugin([customConfig.base.outputPath], {
      allowExternal: true
    })
  ],
  optimization: {
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin(uglifyOptions(customConfig.prod.sourceMap)),
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
    ]
  }
})

if (customConfig.prod.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prodWebpackConfig
