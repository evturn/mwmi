'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const TARGET = process.env.npm_lifecycle_event;
const PORT = 3000;
const PATHS = {
  src: path.join(__dirname, 'src/client'),
  output: path.join(__dirname, 'public'),
  publicPath: '/'
};

const common = {
  port: PORT,
  output: {
    path: PATHS.output,
    filename: 'js/[name].js',
    publicPath: PATHS.publicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    modulesDirectories: ['src', 'node_modules'],
    alias: {
      public: path.join(__dirname, 'public/'),
      style: path.join(__dirname, 'src/assets/less')
    }
  }
};

const LOADERS = [
  {
    test: /\.json$/,
    loader: "json-loader"
  },{
    test: /\.(jpg|svg|png|jpg|gif|eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  },{
    test: /\.(png|jpg|gif|jpeg)$/,
    loader: 'url-loader?limit=8192'
  },{
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },{
    test: /\.woff2(\?\S*)?$/,
    loader: 'url-loader?limit=100000'
  },
];

if (TARGET === 'dev' || !TARGET) {

  module.exports = merge(common, {
    debug: true,
    cache: true,
    devtool: 'eval-source-map',
    entry : {
      app: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        PATHS.src
      ]
    },
    context: PATHS.src,
    devServer: {
      outputPath: PATHS.output,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      port: PORT,
      host: 'localhost'
    },
    module: {
      loaders: LOADERS.concat([
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            optional: ['runtime'],
            stage: 0,
            env: {
              development: {
                plugins: ['react-transform'],
                extra: {
                  'react-transform': {
                    transforms: [{
                      transform:  'react-transform-hmr',
                      imports: ['react'],
                      locals:  ['module']
                    },
                    {
                      transform: 'react-transform-catch-errors',
                      imports: ['react','redbox-react' ]
                    }
                  ]}
                }
              }
            }
          }
        },{
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]' +
            '&sourceMap!autoprefixer-loader!less?sourceMap&outputStyle=expanded' +
            '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, 'src', 'assets', 'less')))
        }
      ])
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new WriteFilePlugin(),
      new ExtractTextPlugin('css/app.css'),
      new WebpackNotifierPlugin()
    ]
  });
}

if (TARGET === 'build' || !TARGET) {

  module.exports = merge(common, {
    entry : {
      app: PATHS.src
    },
    module: {
      loaders: LOADERS.concat([
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname
        }, {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!autoprefixer-loader!less?includePaths[]='
            + encodeURIComponent(path.resolve(__dirname, 'src', 'assets', 'less')))
        }
      ])
    },
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('css/app.css'),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  });
}