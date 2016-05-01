import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from 'components/Header'
import Footer from 'components/Footer'
import css from 'less/global/style.less'

class App extends Component {
  render() {
    const { nav, location, user } = this.props
    return (
      <div className="site">
        <Header nav={nav} pathname={location.pathname} />
        <div className="content">
          {this.props.children}
        </div>
        <Footer user={user} />
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.site.user,
    nav: state.site.nav
  })
)(App)