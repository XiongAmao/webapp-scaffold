module.exports = [
  {
    test: /\.scss$/,
    use: [
      'style-loader',

      // Automatic generation of style.d.ts
      'css-modules-typescript-loader',

      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            exportGlobals: true,
            localIdentName: '[name]__[local]--[hash:base64:6]'
          }
        }
      },
      {
        loader: 'sass-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [require('autoprefixer')]
        }
      }
    ]
  }
]
