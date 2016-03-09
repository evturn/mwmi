import keystone from 'keystone';
import express from 'express';
import path from 'path';
import * as blog from '../controllers/blog';
import * as post from '../controllers/post';
import * as contact from '../controllers/contact';
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

const send = (req, res, next) => res.json(res.locals);

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

  app.get('/api/locals',          blog.loadCategories, blog.loadPosts, send);
  app.get('/api/blog/:category?', blog.currentCategoryFilter, blog.loadCategories, blog.loadPosts, send);
  app.get('/api/blog/post/:post', post.loadCurrentPost, post.loadOtherPosts, send);
  app.get('/api/contact',         contact.get, send);
  app.post('/api/contact',        contact.post, send);
  console.log('hello');

  app.get('*', (req, res) => server(req, res));
}