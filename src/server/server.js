import 'babel-core/polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from '../common/routes';
import createLocation from 'history/lib/createLocation';

const render = (html, initialState, head={
  meta: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
  link: `<link rel="stylesheet" type="text/css" href="/css/app.css" />`
}) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      ${head.meta}
      <title>MWMI</title>
      <link rel="stylesheet", href="http://fonts.googleapis.com/css?family=Raleway:600,700,400,300" type="stylesheet">
      <link rel="stylesheet", href="http://fonts.googleapis.com/css?family=Dosis:400,500,300,200,600,700,800" type="stylesheet">
      <link rel="stylesheet", href="http://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic,900,900italic,100,100italic" type="stylesheet">
      ${head.link}
    </head>
    <body>

      <div id="root">${html}</div>

      <script src="/js/app.js"></script>
    </body>
    </html>
  `;
};

const serve = (req, res) => {
  const location = createLocation(req.url);

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).send(render(renderToString(<RouterContext {...renderProps} />)));
    } else {
      res.status(404).send('Not found');
    }
  });
};

export default serve;

// if (typeof(req.user) !== 'undefined' && req.user.isAdmin) {
//   adminCSS = `<link rel="stylesheet" href="/keystone/styles/content/editor.min.css">`;
//   adminJS = `<script src="/keystone/js/content/editor.js"></script>`;
// }