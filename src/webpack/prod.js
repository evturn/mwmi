import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import {
  PATHS, prodLoaders, extensions,
  modulesDirectories, alias, plugin } from './base';

export default webpack([
  {
    name: 'browser',
    devtool: 'source-map',
    target: 'web',
    context: PATHS.root,
    entry: {
      app: '../app/client'
    },
    output: {
      path: PATHS.output,                // The output directory as absolute path
      filename: PATHS.static.js,         // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: PATHS.publicPath.prod  // The output path from the view of the Javascript
    },
    module: {
      loaders: prodLoaders
    },
    resolve: {
      extensions: extensions,
      modulesDirectories: modulesDirectories,
      alias: alias
    },
    plugins: [
      new CleanPlugin(plugin.clean.paths, plugin.clean.options),
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: true,
        __SERVER__: false
      })
    ]
  },{
    name: 'server-side-rendering',
    devtool: 'source-map',
    target: 'node',
    context: PATHS.root,
    entry: {
      ser: '../app/server'
    },
    output: {
      path: PATHS.output,                 // The output directory as absolute path
      filename: PATHS.static.js,          // The filename of the entry chunk as relative path inside the output.path directory
      publicPath: PATHS.publicPath.prod , // The output path from the view of the Javascript
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: prodLoaders
    },
    resolve: {
      extensions: extensions,
      modulesDirectories: modulesDirectories,
      alias: alias
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin(PATHS.static.css),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __DEV__: false,
        __CLIENT__: false,
        __SERVER__: true
      })
    ]
  }
], (err, stats) => {
  if (err) {
    const jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0) {
      console.log(json.errors);
    }
  }

  console.log(stats.toString({ colors: true }))
});