const webpack = require('webpack');
// 用于压缩打包文件需要后台支持 咱的nginx后台配过了
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  // 打包公共路径
  publicPath: process.env.NODE_ENV === 'production' ? '/tt/' : '/',
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        'window.Quill': 'quill'
      }
    ]);
  },
  configureWebpack: {
    plugins: [
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  }
};
