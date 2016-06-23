'use strict';

const path = require('path');
const webpack = require('webpack');

const port = 3000;
const srcPath = path.join(__dirname, '/src');
const staticPath = path.join(__dirname, '/src/static');
const testPath = path.join(__dirname, '/test');
const distPath = path.join(__dirname, '/dist');
const publicPath = '/';

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:'+port,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: distPath,
    publicPath: publicPath,
    filename: 'app.js'
  },
  port: port,
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'react-hot-loader!babel-loader', include: [ srcPath, testPath ] },
      { test: /\.(css|sass|scss)$/, loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded', include: [ srcPath ] },
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=static/images/[name].[ext]', include: [ path.join(staticPath, '/images') ] },
      { test: /\.(mp4)$/, loader: 'file-loader?name=static/video/[name].[ext]', include: [ path.join(staticPath, '/video') ] },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      actions: path.join(srcPath, '/actions'),
      components: path.join(srcPath, '/components'),
      sources: path.join(srcPath, '/sources'),
      stores: path.join(srcPath, '/stores'),
      static: path.join(srcPath, '/static')
    }
  },
  devServer: {
    port: port,
    publicPath: publicPath,
    additionalPaths: [ testPath ],
    contentBase: srcPath,
    historyApiFallback: true,
    devtool: 'eval-source-map',
    debug: true,
    hot: true,
    cache: true,
    noInfo: false,
    stats: { colors: true, progress: true },
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  }
};