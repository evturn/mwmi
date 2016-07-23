import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Footer from 'components/Footer'

import * as actions from 'actions'

import 'sanitize.css/sanitize.css'
import css from './styles.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialState()
  }

  render() {
    const { nav, location, user } = this.props
    return (
      <div className={css.site}>
        <Header
          nav={nav}
          pathname={location.pathname}
        />
        <div className={css.content}>
          {this.props.children}
        </div>
        <Footer user={user} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
  nav: state.app.nav
})

const mapDispatchToProps = dispatch => ({
  fetchInitialState: _ => dispatch(actions.fetchInitialState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
