const path = require('path');
// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 基础路径 注意发布之前要先修改这里
const baseUrl = "/";
module.exports = {
  baseUrl,
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      jsonpFunction: 'j'
    },
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://47.75.55.94:4321',
        target: 'http://localhost:4321',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': ''
        }
      }
    },
    publicPath: baseUrl
  }
};
