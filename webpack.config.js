var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

var webpackConfig = {
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: [
      'src', 'node_modules'
    ],
    alias: {
      images: path.join(__dirname, 'assets/images'),
      style: path.join(__dirname, 'assets/less')
    }
  }
};

if (process.env.NODE_ENV === 'production') {

  webpackConfig = merge(webpackConfig,{
    devtool: "source-map",
    entry : [
      './src/client/index.js'
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpg|svg|png|jpg|gif|eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]' +
          '&sourceMap!autoprefixer-loader!less?sourceMap&outputStyle=expanded' +
          '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, 'assets', 'less')))
      }
    ]},
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new WriteFilePlugin(),
      new ExtractTextPlugin("app.css"),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  });

}else{

  webpackConfig = merge(webpackConfig,{
    devtool: 'inline-source-map',
    output: {
      path: path.join(__dirname, 'assets'),
      publicPath: '/assets/'
    },
    devServer: {
      outputPath: path.join(__dirname, 'assets')
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          optional: ['runtime'],
          stage: 2,
          env: {
            development: {
              plugins: [
                'react-transform'
              ],
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
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(jpg|svg|png|jpg|gif|eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]' +
          '&sourceMap!autoprefixer-loader!less?sourceMap&outputStyle=expanded' +
          '&includePaths[]=' + encodeURIComponent(path.resolve(__dirname, 'assets', 'less')))
      }
    ]},
    entry : [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new WriteFilePlugin({test: /\.less$/}),
      new ExtractTextPlugin("app.css")
    ]
  });

}

module.exports = webpackConfig;
