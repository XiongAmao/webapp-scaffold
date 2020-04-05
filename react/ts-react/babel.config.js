module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    ['@babel/preset-typescript'],
    ['@babel/preset-react']
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties']
  ]
}
