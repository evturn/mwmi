import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'store';
import routes from 'routes';
import fetch from 'isomorphic-fetch';
import renderLayout from './layout';

const hydrate = (callback) => {
  return fetch('http://localhost:3000/api/locals')
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.log(error));
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
        console.log(data);
        return configureStore({
          blog: {
            posts: posts.results || [],
            post: post || {},
            categories: categories || [],
            category: category || {},
            isFetching: false,
            isCompleted: false
          },
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
          enquiry: {}
        });
      })
      .then(store => {
        const initialState = store.getState();
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>)

        res.status(200).send(renderLayout(html, initialState));
      });

    } else {
      res.status(404).send('Not found');
    }
  });
};

export default serve;