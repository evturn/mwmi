import React from "react";
import { Route } from "react-router";

import App from "./containers/App";
import Home from "./containers/Home";
import Blog from "./containers/Blog";
import Post from "./containers/Post";

export default (
  <Route component={App} name="app">
    <Route path="/" component={Home} />
    <Route path="blog(/:category)" component={Blog} />
    <Route path="blog/post/:post" component={Post} />
  </Route>
);
