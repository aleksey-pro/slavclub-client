/* eslint global-require: [0], import/no-extraneous-dependencies: [0] */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars')({
      silent: true,
      variables() {
        return require('./src/styles/variables.js');
      },
    }),
    require('autoprefixer'),
    require('postcss-hexrgba'),
  ],
};
