import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../../webpack.config';

const compiler = webpack(config);

export default function(app) {
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));

  return app;
};