import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'store';
import routes from 'routes';
import { renderLayout, hydrate } from 'actions/api';

const serve = (req, res) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      hydrate(res => {
        return configureStore({
          blog: res.blog,
          enquiry: res.enquiry,
          pagination: {},
          user: res.user
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