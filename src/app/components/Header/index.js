import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'

import css from './styles.css'

const cx = classNames.bind(css)

class Header extends Component {
  render() {
    const { nav, pathname } = this.props

    return (
      <header className={cx('header')}>
        <ul>{nav.map((x, i)=> {
          const link = <li key={i}><Link to={x.href}>{x.name}</Link></li>
          return pathname !== '/' ? link : x.key === 'home' ? null : link
        })}</ul>
      </header>
    )
  }
}

Header.contextTypes = {
  router: PropTypes.object
}

export default Header
