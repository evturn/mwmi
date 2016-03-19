import keystone from 'keystone';
import express from 'express';
import path from 'path';
import * as blog from './blog';
import * as enquiry from './enquiry';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack/dev';
import server from '../../../dist/js/ser';

const ENV = process.env.NODE_ENV;

const init = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

export default function(app) {
  if (ENV === 'development') {
    console.log(ENV);
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
  }

  app.use(init);

  app.get('/api/locals',          blog.init, blog.populateCategories, blog.findAllPosts);
  app.get('/api/blog/post/:post', blog.findOnePost);
  app.get('/api/contact',         enquiry.get);
  app.post('/api/contact',        enquiry.post);

  app.get('*', (req, res) => server(req, res));
}