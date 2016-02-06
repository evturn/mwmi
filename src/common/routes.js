import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './containers/App';
import Home from './containers/Home';
import Blog from './containers/Blog';
import BlogPost from './containers/BlogPost';
import Contact from './containers/Contact';

export default (
  <Route path="/" component={App} name="app">
    <IndexRoute component={Home} />
    <Route path="blog(/:category)" component={Blog} />
    <Route path="blog/post/:post" component={BlogPost} />
    <Route path="contact" component={Contact} />
  </Route>
);