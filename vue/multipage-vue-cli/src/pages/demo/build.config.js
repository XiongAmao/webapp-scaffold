/**
 * This config will merge into page's html-webpack-plugin config.
 * buid.config.js needs to be in the same directory as main.js.
 */
module.exports = {
  chunks: [],
  // Pass chunkname (build/constants) to customize entry or pass 'all' to use all chunks

  filename: 'custom/index.html',
  // custom output path
  // default: dirname/index.html e.g. demo/index.html

  title: 'this is html title'
  // other options
  // e.g. <%= htmlWebpackPlugin.options.title %> in default html template
}
