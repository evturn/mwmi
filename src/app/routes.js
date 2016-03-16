import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import Enquiry from 'containers/Enquiry';
import Blog from 'containers/Blog';
import BlogPost from 'components/BlogPost';
import BlogPosts from 'components/BlogPosts';

export default (
  <Route path="/" component={App} name="app">
    <IndexRoute component={Home} />
    <Route path="blog" component={Blog}>
      <IndexRoute component={BlogPosts} />
      <Route path=":category" component={BlogPosts} />
      <Route path="post/:post" component={BlogPost} />
    </Route>
    <Route path="contact" component={Enquiry} />
  </Route>
);