import { Route } from "react-router";
import React from "react";

import App from "./containers/App";
import Blog from "./containers/Blog";

//Redux Smart
import CounterPage from "./containers/CounterPage";
import RedditPage from "./containers/RedditPage";
import TodoPage from "./containers/TodoPage";

//Redux Dumb
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import error404 from "./components/404";

export default (
  <Route component={App} name="app">
    <Route path="/" component={HomePage} />
    <Route path="blog" component={Blog} />
    <Route path="reddit" component={RedditPage} />
    <Route path="todo" component={TodoPage} />
    <Route path="counter" component={CounterPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={error404}/>
  </Route>
);
