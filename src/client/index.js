import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from '../common/routes';
import 'style/main.less';

const history = createBrowserHistory();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router history={history}>
    {routes}
  </Router>, document.getElementById('root')
);
