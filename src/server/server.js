import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import configureStore from 'store';
import routes from 'routes';

const hydrate = (callback) => {
  return fetch('http://localhost:3000/api/blog')
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.log(error))
};

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
      hydrate(data => {
        const { posts, post, categories, category } = data;

        return configureStore({
          blog: {
            posts: posts.results || [],
            post: post || {},
            categories: categories || [],
            category: category || {},
            pagination: {
              pages: posts.pages || [],
              currentPage: posts.currentPage || 1,
              first: posts.first || 1,
              last: posts.last || 1,
              next: posts.next || false,
              previous: posts.previous || false,
              total: posts.total || 0,
              totalPages: posts.totalPages || 0
            },
            isFetching: false,
            isCompleted: false
          }
        });
      })
      .then(store => {
        const initialState = store.getState();
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>)

        res.status(200).send(render(html, initialState));
      });

    } else {
      res.status(404).send('Not found');
    }
  });
};

export default serve;