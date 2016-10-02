import React from 'react'
import {
  Route,
  Router,
  browserHistory
} from 'react-router'

import App from 'containers/App'

const initialState = {
  episodes: [],
  user: false,
}

export default (props = initialState) => (
  <Router history={browserHistory}>
    <Route
      path="*"
      component={App(props)}
    />
  </Router>
)
