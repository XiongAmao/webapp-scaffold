const {
  AXIOS,
  VUE,
  VENDORS,
  COMMON,
  VUE_ROUTER,
  VUEX,
} = require('./constants')

// page config chunks = 'all'
const allChunksOption = [
  COMMON,
  VENDORS,
  VUEX,
  VUE,
  VUE_ROUTER,
  AXIOS,
]

// default chunks
const defaultChunksOption = [
  COMMON,
  VENDORS
]

const splitChunksConfig = {
  cacheGroups: {
    vue: {
      name: VUE,
      test: /[\\/]node_modules[\\/]vue[\\/]/,
      chunks: 'all',
      priority: 30
    },
    axios: {
      name: AXIOS,
      test: /[\\/]node_modules[\\/]axios[\\/]/,
      chunks: 'all',
      priority: 20
    },
    vueRouter: {
      name: VUE_ROUTER,
      test: /[\\/]node_modules[\\/]vue-router[\\/]/,
      chunks: 'all',
      priority: 20
    },
    vuex: {
      name: VUEX,
      test: /[\\/]node_modules[\\/]vuex[\\/]/,
      chunks: 'all',
      priority: 20
    },
    // others
    vendors: {
      name: VENDORS,
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      enforce: true,
      chunks: 'initial'
    },
    common: {
      name: COMMON,
      minChunks: 2,
      priority: -20,
      chunks: 'initial',
      reuseExistingChunk: true
    }
  }
}

module.exports = {
  splitChunksConfig,
  allChunksOption,
  defaultChunksOption
}
