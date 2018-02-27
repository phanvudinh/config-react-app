const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const prod = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});

module.exports = prod;