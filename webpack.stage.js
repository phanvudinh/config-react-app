const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

//using Node web server and the ability to use live reloading
const stage = merge(common, {
  output: {publicPath: '/'},
  devtool: 'inline-source-map'
});

const app = express();
const compiler = webpack(stage);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: stage.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Listening on port 3000!\n');
});