import React from 'react'

export default Component => {
  return function componentWrapper(props) {
    return function renderWithProps() {
      return <Component { ...props } />
    }
  }
}
