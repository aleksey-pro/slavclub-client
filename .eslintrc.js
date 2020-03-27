const path = require('path');

module.exports = {
  env: {
    node: true,
    mocha: true
  },
  rules: {
    'max-len': ['error', { code: 150 }]

  },
  extends: 'airbnb-base',
};
