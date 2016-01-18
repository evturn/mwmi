const path = require('path');
const port = 8080;
const publicPath = '/assets/';
const webpack = require('webpack');
const assetsPath = path.join(__dirname, 'public', 'assets');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
console.log(TARGET);
const PATHS = {
  src: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'public', 'assets')
}
const LOADERS = [
  {
    test: /\.js$|\.jsx$/,
    loaders: ['babel'],
    include: PATHS.src
  },{
    test: /\.json$/,
    loader: "json-loader"
  },{
    test: /\.(jpg|svg|png|jpg|gif|eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  },{
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },{
    test: /\.woff2(\?\S*)?$/,
    loader: 'url-loader?limit=100000'
  }
];

const common = {
  port: port,
  debug: true,
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    modulesDirectories: [
      'app', 'node_modules'
    ],
    alias: {
      actions:    path.join(__dirname, './app/actions/'),
      components: path.join(__dirname, './app/components/'),
      containers: path.join(__dirname, './app/containers/'),
      constants:  path.join(__dirname, './app/constants/'),
      images:     path.join(__dirname, './app/images/'),
      reducers:   path.join(__dirname, './app/reducers/'),
      store:      path.join(__dirname, './app/store/'),
      styles:     path.join(__dirname, './app/less/')
    }
  }
};


if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    name: 'browser',
    entry: {
      app: [
        `webpack-dev-server/client?http://127.0.0.1:${port}`,
        'webpack/hot/only-dev-server',
        './app/client'
      ]
    },
    debug: true,
    cache: true,
    devtool: 'eval-source-map',
    devServer: {
      outputPath: `http://localhost:${port}/${PATHS.dist}`,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: port
    },
    module: {
      loaders: LOADERS.concat([
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]' +
            '&sourceMap!autoprefixer-loader!less?sourceMap&outputStyle=expanded' +
            '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'less')))
        }
      ])
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new WriteFilePlugin(),
      new ExtractTextPlugin('styles/app.css'),
      new WebpackNotifierPlugin()
    ]
  });
}

if (TARGET === 'build:webpack' || !TARGET) {
  module.exports = [
    merge(common, {
      name: "browser",
      entry: {
        app: './app/client'
      },
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['eslint']
      }],
      module: {
        loaders: LOADERS.concat([
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!autoprefixer-loader!less?includePaths[]='
              + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'less')))
          }
        ])
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/app.css')
      ]
    }),
    merge(common, {
      name: "server-side rendering",
      entry: {
        app: './app/server'
      },
      target: 'node',
      output: {
        path: path.join(__dirname, 'public', 'assets'),
        filename: '[name].server.js',
        publicPath: 'assets/',
        libraryTarget: 'commonjs2'
      },
      module: {
        loaders: LOADERS.concat([
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]!autoprefixer-loader!less?includePaths[]='
              + encodeURIComponent(path.resolve(__dirname, '..', 'app', 'less')))
          }
        ])
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/app.css')
      ]
    })
  ];
}