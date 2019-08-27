// default chunks
const VENDORS = 'vendors' // node_modules/*
const COMMON = 'common' // !node_modules/*
const RUNTIME = 'runtime'

// custom chunk
const VUE = 'vue-vendor'
const VUE_ROUTER = 'vue-router-vendor'
const VUEX = 'vuex-vendor'
const AXIOS = 'axios-vendor'

module.exports = {
  VUE,
  VENDORS,
  COMMON,
  AXIOS,
  RUNTIME,
  VUE_ROUTER,
  VUEX
}
