import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/header.less';

const cx = classNames.bind(css);

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className={cx('header')}>
        <div className={cx('wrapper')}>
          <ul className={cx('navbar-links')}>
            <li><IndexLink to='/'>Home</IndexLink></li>
            <li><Link to='/blog'>Blog</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect()(Header);