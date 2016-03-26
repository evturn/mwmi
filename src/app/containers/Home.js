import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/home.less';

const cx = classNames.bind(css);

export default class Home extends Component {
  render() {
    return (
      <div className={cx('home')}>
        <div className={cx('hero')}>
          <img className={cx('image')} src={require('images/home.png')} />
          <div className={cx('title')}>MWMI</div>
        </div>
        <div className={cx('headline')}>
          <div className={cx('text')}>Inspiring stories from successful pancakes</div>
          <Link to={{ pathname: '/blog' }}>
            <button className={cx('btn')}>Stream Now</button>
          </Link>
        </div>
      </div>
    );
  }
}