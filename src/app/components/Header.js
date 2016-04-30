import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/header.less';

const cx = classNames.bind(css);

class Header extends Component {
  render() {
    const { nav, path } = this.props;
    console.log(this.props.path)
    return (
      <header className={cx('header')}>
        <ul>{nav.map(link => {
          if (path === '/' && link.key !== 'home') {
            return <li key={link.key}><Link to={link.href}>{link.name}</Link></li>
          }
        })}</ul>
      </header>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object
}

export default Header