import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';
import 'style/main.less';

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter>
      <Router history={history}>
        {routes}
      </Router>
    </ReduxRouter>
  </Provider>, document.getElementById('root')
);
