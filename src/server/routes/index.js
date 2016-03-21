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

const locals = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.nav = [
    {name: 'Home',    key: 'home',    href: '/'},
    {name: 'Blog',    key: 'blog',    href: '/blog'},
    {name: 'Contact', key: 'contact', href: '/contact'}
  ];

  next();
};

export default function(app) {
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
  }

  app.use(locals);

  app.get('/api/locals',          blog.init, blog.populateCategories, blog.populateAuthors, blog.findAllPosts);
  app.get('/api/blog/post/:post', blog.findOnePost);
  app.get('/api/contact',         enquiry.get);
  app.post('/api/contact',        enquiry.post);

  app.get('*', (req, res) => server(req, res));
}