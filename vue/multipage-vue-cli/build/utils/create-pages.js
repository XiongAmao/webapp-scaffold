const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const { RUNTIME } = require('../constants')

const isDevEnv = process.env.NODE_ENV === 'development'

// utils
const isFileExist = fs.pathExistsSync

const addExtraChunks = (chunks = [], extraChunks = []) => {
  if (Array.isArray(chunks) && extraChunks) {
    extraChunks.forEach(extra => {
      if (!chunks.includes(extra)) {
        chunks.push(extra)
      }
    })
  }
}

const createPages = ({
  allChunksOption = [],
  defaultChunksOption = [],
  excludeEntries = []
}) => {
  // default
  const defaultTemplate = 'src/assets/index.html'
  const pagesRootPath = path.join(process.cwd(), './src/pages')

  const getConfig = (dirPath) => {
    const buildConfigPath = path.resolve(dirPath, './build.config.js')

    if (!isFileExist(buildConfigPath)) return {}

    const config = require(buildConfigPath)

    return _.isObject(config) ? config : {}
  }

  const addRuntimeAndEntry = (chunks, entryChunkName) => {
    addExtraChunks(chunks, [entryChunkName, RUNTIME])
  }

  /**
   * In dev mode webpack will inject [vendor, common] chunks to entry.
   * Therefor, all chunks are injected in dev mode.
   */
  const addDevEnvChunks = (chunks) => {
    if (isDevEnv) addExtraChunks(chunks, allChunksOption)
  }

  const getTemplatePath = (dirPath) => {
    const templatePath = path.resolve(dirPath, './index.html')
    return isFileExist(templatePath) ? templatePath : defaultTemplate
  }

  const entryPaths = glob.sync(`${pagesRootPath}/**/main.js`, {
    ignore: excludeEntries
  })
  const pages = {}

  entryPaths.forEach((entryPathFromGlob) => {
    // glob will output poxis path in windows, e.g. c:/a/b/c
    // although windows can recognize it, we need right platform path like c:\a\b\c in windows
    const entryPath = path.normalize(entryPathFromGlob)
    const entryDirName = path.dirname(entryPath)
    const entryBaseName = path.basename(entryPath)
    const entryChunkName = entryPath
      .replace(pagesRootPath, '')
      .replace(entryBaseName, '')
      .split(path.sep)
      .filter(Boolean)
      .join('/')
    // chunkName need posix-style path, to fix plaform difference issues
    const customConfig = getConfig(entryDirName)

    // config.chunks === 'all'
    if (_.isString(customConfig.chunks) && /^all$/i.test(customConfig.chunks)) {
      customConfig.chunks = [...allChunksOption]
    }

    // output path
    const filename = `${entryChunkName}/index.html`
    const config = Object.assign(
      {
        entry: entryPath,
        template: getTemplatePath(entryDirName),
        filename,
        chunks: [...defaultChunksOption],
        title: ''
      },
      customConfig
    )

    addRuntimeAndEntry(config.chunks, entryChunkName)
    addDevEnvChunks(config.chunks)

    pages[entryChunkName] = config
  })

  return pages
}

module.exports = createPages
