'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _base = require('./base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  debug: true,
  cache: true,
  devtool: 'eval-source-map',
  name: 'browser',
  context: _base.PATHS.root,
  contentBase: _base.PATHS.root,
  entry: {
    app: ['../app/client', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true']
  },
  output: {
    path: _base.PATHS.output, // The output directory as absolute path
    filename: _base.PATHS.static.js, // The filename of the entry chunk as relative path inside the output.path directory
    publicPath: _base.PATHS.publicPath.dev // The output path from the view of the Javascript
  },
  devServer: {
    outputPath: _base.PATHS.output,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    port: 3000,
    host: 'localhost'
  },
  module: {
    loaders: _base.devLoaders
  },
  resolve: {
    extensions: _base.extensions,
    modulesDirectories: _base.modulesDirectories,
    alias: _base.alias
  },
  plugins: [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin(), new _writeFileWebpackPlugin2.default(), new _extractTextWebpackPlugin2.default(_base.PATHS.static.css), new _webpack2.default.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    __DEV__: true,
    __CLIENT__: true,
    __SERVER__: false
  })]
};
module.exports = exports['default'];