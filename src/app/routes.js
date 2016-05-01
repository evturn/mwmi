import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'containers/App'
import Home from 'containers/Home'
import Enquiry from 'containers/Enquiry'
import Gallery from 'containers/Gallery'

export default (
  <Route path="/" component={App} name="app">
    <IndexRoute component={Home} />
    <Route path="contact" component={Enquiry} />
    <Route path="gallery" component={Gallery} />
  </Route>
)