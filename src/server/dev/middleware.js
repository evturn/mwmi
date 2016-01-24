import 'babel-core/polyfill';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function(app) {
  if (process.env.NODE_ENV !== 'production'){
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: '/assets/',
      outputPath: path.join(__dirname, '..', '..', '..', 'assets'),
    }));
    app.use(webpackHotMiddleware(compiler));
  } else{
    app.use('/assets', express.static(path.join(__dirname, '..', '..', '..', 'assets')));
  }

  return app;
}