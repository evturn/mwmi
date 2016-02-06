const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../../webpack.config');
const compiler = webpack(config);

export default function(app) {
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));

  return app;
};