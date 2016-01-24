import React from "react";
import { Route } from "react-router";

import App from "./containers/App";
import Home from "./containers/Home";
import Blog from "./containers/Blog";

export default (
  <Route component={App} name="app">
    <Route path="/" component={Home} />
    <Route path="blog" component={Blog} />
  </Route>
);
