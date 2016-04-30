'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _cleanWebpackPlugin = require('clean-webpack-plugin');

var _cleanWebpackPlugin2 = _interopRequireDefault(_cleanWebpackPlugin);

var _copyWebpackPlugin = require('copy-webpack-plugin');

var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);

var _base = require('./base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _webpack2.default)([{
  name: 'browser',
  devtool: 'source-map',
  target: 'web',
  context: _base.PATHS.root,
  entry: {
    app: '../app/client'
  },
  output: {
    path: _base.PATHS.output, // The output directory as absolute path
    filename: _base.PATHS.static.js, // The filename of the entry chunk as relative path inside the output.path directory
    publicPath: _base.PATHS.publicPath.prod // The output path from the view of the Javascript
  },
  module: {
    loaders: _base.prodLoaders
  },
  resolve: {
    extensions: _base.extensions,
    modulesDirectories: _base.modulesDirectories,
    alias: _base.alias
  },
  plugins: [new _cleanWebpackPlugin2.default(_base.plugin.clean.paths, _base.plugin.clean.options), new _webpack2.default.optimize.OccurenceOrderPlugin(), new _extractTextWebpackPlugin2.default(_base.PATHS.static.css), new _webpack2.default.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }), new _copyWebpackPlugin2.default([{
    from: _path2.default.join(__dirname, '..', 'client', 'img', 'favicon.png'),
    to: 'favicon.png'
  }]), new _webpack2.default.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    __DEV__: false,
    __CLIENT__: true,
    __SERVER__: false
  })]
}, {
  name: 'server-side-rendering',
  devtool: 'source-map',
  target: 'node',
  context: _base.PATHS.root,
  entry: {
    ser: '../app/server'
  },
  output: {
    path: _base.PATHS.output, // The output directory as absolute path
    filename: _base.PATHS.static.js, // The filename of the entry chunk as relative path inside the output.path directory
    publicPath: _base.PATHS.publicPath.prod, // The output path from the view of the Javascript
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: _base.prodLoaders
  },
  resolve: {
    extensions: _base.extensions,
    modulesDirectories: _base.modulesDirectories,
    alias: _base.alias
  },
  plugins: [new _webpack2.default.optimize.OccurenceOrderPlugin(), new _extractTextWebpackPlugin2.default(_base.PATHS.static.css), new _webpack2.default.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    __DEV__: false,
    __CLIENT__: false,
    __SERVER__: true
  })]
}], function (err, stats) {
  if (err) {
    var jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0) {
      console.log(json.errors);
    }
  }

  console.log(stats.toString({ colors: true }));
});
module.exports = exports['default'];