import 'babel-core/polyfill';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../common/routes';
import packagejson from '../../package.json';
import path from 'path';
import blogMW from './routes/blog';
import postMW from './routes/post';

export default function(app) {
  const renderFullPage = (html, initialState) => {
    return `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>MWMI</title>
        <link rel="stylesheet", href="http://fonts.googleapis.com/css?family=Raleway:600,700,400,300" type="stylesheet">
        <link rel="stylesheet", href="http://fonts.googleapis.com/css?family=Dosis:400,500,300,200,600,700,800" type="stylesheet">
        <link rel="stylesheet", href="http://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic,900,900italic,100,100italic" type="stylesheet">
        <link rel="stylesheet" type="text/css" href="/assets/app.css">
      </head>
      <body>

        <div id="root">${html}</div>

        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script src="/assets/bundle.js"></script>
      </body>
      </html>
    `;
  }

  if(process.env.NODE_ENV !== 'production'){
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: '/assets/',
      outputPath: path.join(__dirname, '..', '..', 'assets'),
    }));
    app.use(webpackHotMiddleware(compiler));
  }else{
    app.use('/assets', express.static(path.join(__dirname, '..', '..', 'assets')));
  }

  app.get('/*', blogMW, postMW, function(req, res, next) {
    const location = createLocation(req.url);
    match({ routes, location }, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return res.status(500).end('Internal server error');
      }

      if (!renderProps) {
        return res.status(404).end('Not found');
      }

      const componentHTML = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
      const initialState = res.locals;
      res.status(200).end(renderFullPage(componentHTML, initialState))
    });

  });
}
  // const server = app.listen(3002, () => {
  //   const host = server.address().address;
  //   const port = server.address().port;
  //   console.log(`We running in ${process.env.NODE_ENV}`);
  //   console.log(`Listening on ${port}`);
  // });
