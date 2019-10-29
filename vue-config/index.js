const path = require('path');
const BlueAlias = require('blue-alias');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

/* 设置别名 */
const alias = new BlueAlias();
alias.setAlias({
  [`$mock`]: resolve('../blue-vue-program/mock')
});
global['alias'] = alias;


module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        '$config': resolve(`./config`),
        '$components': resolve(`./components`),
        '$icons': resolve(`./icons`),
        '$demo': resolve(`./demo`),
        '$assets': resolve(`./assets`),
        '$axios': resolve(`./use-in-vue/axios`),
        '$api': resolve(`./api`),
        '$code': resolve(`./code`),
        '$use-in-vue': resolve(`./use-in-vue`),
        '$use-in-vue-router': resolve(`./use-in-vue-router`),
        '$vendor': resolve(`./vendor`)
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "$assets/css/element-admin/variables.scss"; @import "$assets/css/element-admin/mixin.scss";`
      }
    }
  },
  lintOnSave: false,
  productionSourceMap: false
};