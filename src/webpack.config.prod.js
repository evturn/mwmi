const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const PATHS = require('../wp').PATHS;
const extensions = require('../wp').extensions;
const modulesDirectories = require('../wp').modulesDirectories;
const alias = require('../wp').alias;
const plugin = require('../wp').plugin;

module.exports = [
  {
    name: 'browser',
    devtool: 'source-map',
    context: PATHS.root,
    entry: {
      app: './src/client'
    },
    output: {
      path: PATHS.output,                // The output directory as absolute path
      filename: PATHS.static.js,         // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: PATHS.publicPath.prod  // The output path from the view of the Javascript

    },
    module: {
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: PATHS.app
        },{
          test: /\.css$/,
          loaders: ['style', 'css']
        },{
          test: /\.json$/,
          loader: 'json-loader'
        },{
          test: /\.(gif|png|jpe?g|svg|eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader'
        },{
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },{
          test: /\.woff2(\?\S*)?$/,
          loader: 'url-loader?limit=100000'
        },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!less?includePaths[]='
            + encodeURIComponent(PATHS.less))
        }
      ]
    },
    resolve: {
      extensions: extensions,
      modulesDirectories: modulesDirectories,
      alias: alias
    },
    plugins: [
      new CleanPlugin(PATHS.clean, plugin.clean),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'window.__DEV__': false
      })
    ]
  },{
    name: 'server',
    context: PATHS.root,
    entry: {
      app: './src/server/server'
    },
    target: 'node',
    output: {
      path: PATHS.output,                 // The output directory as absolute path
      filename: 'js/[name].server.js',    // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: PATHS.publicPath.prod,  // The output path from the view of the Javascript
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: PATHS.app
        },{
          test: /\.css$/,
          loaders: ['style', 'css']
        },{
          test: /\.json$/,
          loader: 'json-loader'
        },{
          test: /\.(gif|png|jpe?g|svg|eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader'
        },{
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },{
          test: /\.woff2(\?\S*)?$/,
          loader: 'url-loader?limit=100000'
        },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!less?includePaths[]='
            + encodeURIComponent(PATHS.less))
        }
      ]
    },
    resolve: {
      extensions: extensions,
      modulesDirectories: modulesDirectories,
      alias: alias
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new CleanPlugin(PATHS.clean, plugin.clean),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css)
    ]
  }
];