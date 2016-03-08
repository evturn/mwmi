import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import configureStore from 'store';
import routes from 'routes';

const render = (html, initialState) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MWMI</title>
      <link rel="stylesheet" type="text/css" href="dist/css/app.css" />
    </head>
    <body>

      <div id="root">${html}</div>

      <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
      <script src="/dist/js/app.js"></script>
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
          post: {},
          posts: [],
          categories: [],
          category: {},
          pagination: {
            pages: [],
            currentPage: 1,
            first: 1,
            last: 1,
            next: false,
            previous: false,
            total: 0,
            totalPages: 0
          },
          isFetching: false,
          isCompleted: false
        }
      });
      const initialState = store.getState();
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>)

      res.status(200).send(render(html, initialState));
    } else {
      res.status(404).send('Not found');
    }
  });
};

export default serve;