'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prodLoaders = exports.devLoaders = exports.modulesDirectories = exports.extensions = exports.plugin = exports.alias = exports.PATHS = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATHS = exports.PATHS = {
  app: _path2.default.join(__dirname, '..', '..', 'src'),
  output: _path2.default.join(__dirname, '..', '..', 'dist'),
  publicPath: {
    dev: '/dist/',
    prod: '/dist/'
  },
  less: _path2.default.resolve(__dirname, '..', 'client', 'less'),
  static: {
    js: 'js/[name].js',
    css: 'css/app.css',
    img: 'img/[hash].[ext]'
  },
  root: __dirname
};

var alias = exports.alias = {
  actions: _path2.default.join(__dirname, '../app/actions/'),
  containers: _path2.default.join(__dirname, '../app/containers/'),
  components: _path2.default.join(__dirname, '../app/components/'),
  reducers: _path2.default.join(__dirname, '../app/reducers/'),
  store: _path2.default.join(__dirname, '../app/store/'),
  routes: _path2.default.join(__dirname, '../app/routes'),
  images: _path2.default.join(__dirname, '../client/img/'),
  less: _path2.default.join(__dirname, '../client/less/')
};

var plugin = exports.plugin = {
  clean: {
    paths: ['dist'],
    options: {
      root: _path2.default.join(__dirname, '..', '..')
    }
  }
};

var extensions = exports.extensions = ['', '.js', '.jsx', '.less'];
var modulesDirectories = exports.modulesDirectories = ['app', 'node_modules'];

var devLoaders = exports.devLoaders = [{
  test: /\.js$|\.jsx$/,
  loader: 'babel',
  exclude: /node_modules/,
  include: PATHS.app
},, {
  test: /\.json$/,
  loader: 'json-loader'
}, {
  test: /\.(eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader'
}, {
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file-loader'
}, {
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  loaders: ['file?hash=sha512&digest=hex&name=' + PATHS.static.img, 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'],
  exclude: /less/
}, {
  test: /\.woff2(\?\S*)?$/,
  loader: 'url-loader?limit=100000'
}, {
  test: /\.less$/,
  loader: _extractTextWebpackPlugin2.default.extract('style-loader', 'css-loader!less-loader'),
  include: /global/
}, {
  test: /\.less$/,
  loader: 'style!css?module&localIdentName=[local]__[hash:base64:5]' + '&sourceMap!less?sourceMap&outputStyle=expanded' + '&includePaths[]=' + encodeURIComponent(PATHS.less),
  exclude: /global/
}];

var prodLoaders = exports.prodLoaders = [{
  test: /\.js$|\.jsx$/,
  loader: 'babel',
  exclude: /node_modules/,
  include: PATHS.app
},, {
  test: /\.json$/,
  loader: 'json-loader'
}, {
  test: /\.(eot|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader'
}, {
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file-loader'
}, {
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  loaders: ['file?hash=sha512&digest=hex&name=' + PATHS.static.img, 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'],
  exclude: /less/
}, {
  test: /\.woff2(\?\S*)?$/,
  loader: 'url-loader?limit=100000'
}, {
  test: /\.less$/,
  loader: _extractTextWebpackPlugin2.default.extract('style-loader', 'css-loader!less-loader'),
  include: /global/
}, {
  test: /\.less$/,
  loader: _extractTextWebpackPlugin2.default.extract('style-loader', 'css-loader?module&localIdentName=[local]__[hash:base64:5]' + '!less?includePaths[]=' + encodeURIComponent(PATHS.less)),
  exclude: /global/
}];