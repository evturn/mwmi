import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App.jsx';
import Home from '../containers/Home.jsx';
import Blog from '../containers/Blog.jsx';
import {Router, Route, IndexRoute} from 'react-router';
import {createHashHistory} from 'history';

const router = (
  <Router history={createHashHistory({queryKey: false})}>
    <Route component={App} path='/' >
      <IndexRoute component={Home} name='home' />
      <Route component={Blog} path='blog' name='blog' />
    </Route>
  </Router>
);

ReactDOM.render(router, document.getElementById('app'));
