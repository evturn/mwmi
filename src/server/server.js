import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux'
import configureStore from '../common/store/index.js';
import routes from '../common/routes';
import createLocation from 'history/lib/createLocation';
import packagejson from '../../package.json';
import fetch from 'isomorphic-fetch';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

function fetchBlog(callback) {
  fetch(`http://${clientConfig.host}:${clientConfig.port}/api/blog`)
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => console.log(err));
}

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

export default function render(req, res) {
  const location = createLocation(req.url);
  match({routes, location}, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }
    const site = {

    };
    fetchBlog(apiResult => {
      console.log(apiResult);
      console.log('========DYATA==========')
      const store = configureStore({
        blog: {
          posts: apiResult.data.posts,
          categories: apiResult.data.categories
        },
        site: {
          section: res.locals.section,
          navLinks: res.locals.navLinks,
          user: res.locals.user
        }
      });
      const initialState = store.getState();
      const renderedContent = ReactDOM.renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>);

      res.status(200).end(renderFullPage(renderedContent, initialState))
    })


  });
}