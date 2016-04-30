import keystone from 'keystone';
import express from 'express';
import * as episode from './episode';
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

console.log(process.env.NODE_ENV, 'outside')
export default function(app) {
  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV, 'inside')
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
  }

  app.use(locals);

  app.get('/api/locals',          episode.get, gallery.get, episode.send);
  app.get('/api/contact',         enquiry.get);
  app.post('/api/contact',        enquiry.post);
  app.get('/api/gallery',         gallery.get);

  app.get('*', (req, res) => server(req, res));
}