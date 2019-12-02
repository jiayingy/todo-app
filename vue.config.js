const path = require('path');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  // chainWebpack: config => {
  //   config.module
  //     .rule('eslint')
  //     .use('eslint-loader')
  //     .options({
  //       fix: true
  //     });
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/styles/_variables.scss')
      ]
    }
  }
};
