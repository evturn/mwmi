const path = require('path');

exports.PATHS = {
  app: path.join(__dirname, '..', '..', 'src'),
  output: path.join(__dirname, '..', '..', 'dist'),
  publicPath: {
    dev: '/dist/',
    prod: '/dist/'
  },
  less: path.resolve(__dirname, '..', 'client', 'less'),
  static: {
    js: 'js/[name].js',
    css: 'css/app.css',
    img: 'img/[hash].[ext]'
  },
  root: __dirname
};

exports.alias = {
  actions:       path.join(__dirname, '../app/actions/'),
  containers:    path.join(__dirname, '../app/containers/'),
  components:    path.join(__dirname, '../app/components/'),
  reducers:      path.join(__dirname, '../app/reducers/'),
  store:         path.join(__dirname, '../app/store/'),
  routes:        path.join(__dirname, '../app/routes'),
  images:        path.join(__dirname, '../client/img/'),
  less:          path.join(__dirname, '../client/less/')
};

exports.plugin = {
  clean: {
    paths: ['dist'],
    options: {
      root: path.join(__dirname, '..', '..')
    }
  }
};

exports.extensions = ['', '.js', '.jsx', '.less'];
exports.modulesDirectories = ['app', 'node_modules'];