module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    indent: 'off',
    'no-multiple-empty-lines': 'off',
    'no-new': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'no-multiple-empty-lines': 'off',
    'space-before-function-paren': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': 'error',
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/standard'],
  globals: {
    __NODE_ENV__: true,
    __PUBLIC_PATH__: true,
    __DEV_TOKEN__: true
  }
}
