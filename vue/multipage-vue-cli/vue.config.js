const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const baseConfig = require('./build/base.config')
const { splitChunksConfig } = require('./build/chunks.config.js')
const devConfig = require('./build/dev.config.js')

const NODE_ENV = process.env.NODE_ENV
const BUILD_TARGET = process.env.BUILD_TARGET
const ANALYZE = process.env.ANALYZE
const isProdEnv = NODE_ENV === 'production'
const isProdBuildTarget = BUILD_TARGET === 'production'

const createWriteFilePlugin = () => {
  return NODE_ENV === 'development' ? new WriteFilePlugin() : () => {}
}

const createVConsolePlugin = () => {
  return !isProdBuildTarget
    ? new VConsolePlugin({
        enable: true
      })
    : () => {}
}

module.exports = {
  publicPath: baseConfig.publicPath,
  outputDir: baseConfig.outputDir,
  pages: baseConfig.pages,
  productionSourceMap: !isProdBuildTarget,
  devServer: devConfig.devServer,

  css: {
    extract: isProdEnv, // https://github.com/vuejs/vue-cli/issues/4378
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/sass/global.scss";
          @import "@/styles/sass/_variables.scss";
          @import "@/styles/sass/_mixin.scss";
          @import "@/styles/sass/loading.scss";
        `
      }
    }
  },
  chainWebpack: (webpackConfig) => {
    webpackConfig.when(!isProdBuildTarget, (config) =>
      config.devtool('cheap-source-map')
    )

    // TODO: Remove this workaround once https://github.com/vuejs/vue-cli/issues/2463 is fixed
    // Remove preload plugins for multi-page build to prevent infinite recursion
    Object.keys(baseConfig.pages).forEach((page) => {
      webpackConfig.plugins.delete(`preload-${page}`)
      webpackConfig.plugins.delete(`prefetch-${page}`)
    })

    webpackConfig.optimization.splitChunks(splitChunksConfig)
    webpackConfig.optimization.runtimeChunk('single')

    // https://github.com/vuejs/vue-cli/issues/4378
    // rewrite css publicPath, use absolute path
    const shadowMode = !!process.env.VUE_CLI_CSS_SHADOW_MODE
    const shouldExtract = isProdEnv && !shadowMode
    if (shouldExtract) {
      [
        { lang: 'css', test: /\.css$/ },
        { lang: 'postcss', test: /\.p(ost)?css$/ },
        { lang: 'scss', test: /\.scss$/ },
        { lang: 'sass', test: /\.sass$/ },
        { lang: 'less', test: /\.less$/ },
        { lang: 'stylus', test: /\.styl(us)?$/ }
      ].forEach(({ lang, test }) => {
        const baseRule = webpackConfig.module.rule(lang).test(test)
        ;[
          // rules for <style lang="module">
          baseRule.oneOf('vue-modules').resourceQuery(/module/),
          // rules for <style>
          baseRule.oneOf('vue').resourceQuery(/\?vue/),
          // rules for *.module.* files
          baseRule.oneOf('normal-modules').test(/\.module\.\w+$/),
          // rules for normal CSS imports
          baseRule.oneOf('normal')
        ].forEach((rule) => {
          rule
            .use('extract-css-loader')
            .loader(require('mini-css-extract-plugin').loader)
            .options({
              hmr: !isProdEnv
            })
        })
      })
    }
    if (ANALYZE) {
      webpackConfig
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack: {
    resolve: {
      alias: baseConfig.alias
    },
    plugins: [
      new webpack.DefinePlugin(baseConfig.globalVars),
      createWriteFilePlugin(),
      createVConsolePlugin(),
      new InlineManifestWebpackPlugin()
    ]
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}
