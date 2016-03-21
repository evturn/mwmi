import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/header.less';

const cx = classNames.bind(css);

export default class Header extends Component {
  render() {
    const { nav } = this.props;

    return (
      <header className={cx('header')}>
        <ul>{nav.map(link =>
          <li key={link.key}><Link to={link.href}>{link.name}</Link></li>
        )}</ul>
      </header>
    );
  }
}