const nodeExternals = require('webpack-node-externals'),
path = require('path'),
webpack = require('webpack'),
srcPath = path.resolve(__dirname),
distPath = path.resolve(__dirname, 'dist');

module.exports = {
context: srcPath,
entry: ["babel-polyfill", './server.js'],
output: {
    path: distPath,
    filename: 'server.js'
},
target: 'node',
node: {
    __dirname: false,
    __filename: false
},
plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
],
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread'] }
            }],
        }
    ]
},
externals: nodeExternals()
};
