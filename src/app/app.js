import React from 'react'
import { render } from 'react-dom'

import fetch from 'utils/fetch'

import Root from './containers/Root'

fetch(props => (
  render(
    <Root { ...props } />,
    document.getElementById('app')
  )
))