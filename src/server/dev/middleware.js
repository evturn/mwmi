import 'babel-core/polyfill';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function(app) {
  if (process.env.NODE_ENV === 'development'){
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
  }

  return app;
}