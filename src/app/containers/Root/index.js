import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import {
  applyRouterMiddleware,
  Route,
  IndexRoute,
  Router,
  browserHistory
} from 'react-router'
import useScroll from 'react-router-scroll'
import selectTippyTop from 'utils/scroll'

import App from 'containers/App'
import Home from 'containers/Home'
import Enquiry from 'containers/Enquiry'
import Gallery from 'containers/Gallery'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll(selectTippyTop))}>
      <Route path="/" component={App} name="app">
        <IndexRoute component={Home} />
        <Route path="contact" component={Enquiry} />
        <Route path="gallery" component={Gallery} />
      </Route>
    </Router>
  </Provider>
)

Root.PropTypes = {
  store: PropTypes.object.isRequired
}

export default Root
