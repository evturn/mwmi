import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'store';
import routes from 'routes';

const initialState = typeof window === 'object' ? window.__INITIAL_STATE__ : {};
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
);
