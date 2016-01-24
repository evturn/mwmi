import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/store';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from '../common/routes';
import 'style/main.less';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
);
