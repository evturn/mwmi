import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import configureStore from '../app/store';
import routes from '../app/routes';

const render = (html, initialState) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MWMI</title>
      <link rel="stylesheet" type="text/css" href="/css/app.css" />
    </head>
    <body>

      <div id="root">${html}</div>

      <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
      <script src="/js/app.js"></script>
    </body>
    </html>
  `;
};

const serve = (req, res) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore({
        blog: {
          isFetching: false,
          isCompleted: false,
          posts: {},
          post: {},
          results: [],
          categories: [],
          category: null
        }
      });
      const initialState = store.getState();
      const virtualDOM = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>)

      res.status(200).send(render(virtualDOM));
    } else {
      res.status(404).send('Not found');
    }
  });
};

export default serve;