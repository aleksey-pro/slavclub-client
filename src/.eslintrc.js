const { resolve } = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  globals: {
    __DEV__: true,
  },
  settings: {
    "import/resolver": {
      alias: [
        ['config', resolve(__dirname, './src/config/default')],
      ],
      webpack: {
        config: resolve(__dirname, './tools/webpack.config.js')
      }
    }
  },
  rules: {
    'max-len': ['error', { 'code': 120 }],
    'jsx-a11y/no-autofocus': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'react/forbid-prop-types': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/destructuring-assignment': [0],
    'no-underscore-dangle': [0]
    "react/prop-types": 0,
  },
  extends: 'airbnb',
};
