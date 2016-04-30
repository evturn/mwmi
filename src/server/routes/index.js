import keystone from 'keystone';
import express from 'express';
import * as blog from './blog';
import * as enquiry from './enquiry';
import * as gallery from './gallery';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack/dev';
import server from '../../../dist/js/ser';

const locals = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.nav = [
    {name: 'Home',    key: 'home',    href: '/'},
    {name: 'Gallery', key: 'gallery', href: '/gallery'},
    {name: 'About',   key: 'about',   href: '/about'}
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

  app.get('/api/locals',          blog.init, blog.findAllPosts, gallery.get, blog.sendPayload);
  app.get('/api/blog/post/:post', blog.findOnePost);
  app.get('/api/contact',         enquiry.get);
  app.post('/api/contact',        enquiry.post);
  app.get('/api/gallery',         gallery.get);

  app.get('*', (req, res) => server(req, res));
}