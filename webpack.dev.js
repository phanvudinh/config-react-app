const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const dev = merge(common, {
  output: {publicPath: '/'},
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = dev;