import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createStore from 'store';
import routes from '../common/routes';
import 'style/main.less';

const store = createStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById('root')
);
