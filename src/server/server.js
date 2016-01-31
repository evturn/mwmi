import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from '../common/routes';
import createLocation from 'history/lib/createLocation';

let adminCSS;
let adminJS;

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
      <link rel="stylesheet" type="text/css" href="css/app.css">

    </head>
    <body>

      <div id="root">${html}</div>

      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
      <script src="app.js"></script>

    </body>
    </html>
  `;
}

const render = (req, res) => {
  const location = createLocation(req.url);

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if (err) { return res.status(500).end('Internal server error'); }

    // if (typeof(req.user) !== 'undefined' && req.user.isAdmin) {
    //   adminCSS = `<link rel="stylesheet" href="/keystone/styles/content/editor.min.css">`;
    //   adminJS = `<script src="/keystone/js/content/editor.js"></script>`;
    // }

    if (renderProps) {
      res.status(200).end(renderFullPage(ReactDOM.renderToString(
        <RouterContext {...renderProps} />), res.locals))
    } else {
      res.status(404).end('Not found');
    }
  });
};

export default render;