import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { fetchComponentDataBeforeRender } from '../common/api/fetchComponentDataBeforeRender';
import configureStore from '../common/store/configureStore';
import { getUser } from '../common/api/user';
import routes from '../common/routes';
import packagejson from '../../package.json';
import path from 'path';

const app = express();
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

app.get('/*', function (req, res) {

  const location = createLocation(req.url);

  getUser(user => {
      if (!user) { return res.status(401).end('Not Authorised'); }

      match({ routes, location }, (err, redirectLocation, renderProps) => {
        if(err) {
          console.error(err);
          return res.status(500).end('Internal server error');
        }
        if (!renderProps) { return res.status(404).end('Not found'); }


        const store = configureStore({
          user : user,
          version : packagejson.version
        });

        const InitialView = (
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        );

        //This method waits for all render component promises to resolve before returning to browser
        fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
          .then(html => {
            const componentHTML = ReactDOM.renderToString(InitialView);
            const initialState = store.getState();
            res.status(200).end(renderFullPage(componentHTML,initialState))
          })
          .catch(err => {
            console.log(err)
            res.end(renderFullPage("",{}))
          });
      });

    }
  )

});

const server = app.listen(3002, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`We running in ${process.env.NODE_ENV}`);
  console.log(`Listening on ${port}`);
});
