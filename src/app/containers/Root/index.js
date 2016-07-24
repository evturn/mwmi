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

export default (props = initialState) => {
  const AppWithProps = withProps(props)

  return (
    <Router history={browserHistory}>
      <Route
        path="*"
        component={AppWithProps}
      />
    </Router>
  )
}

function withProps(props) {
  return _ => <App { ...props } />
}
