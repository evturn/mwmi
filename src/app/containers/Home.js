import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/home.less';

const cx = classNames.bind(css);

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.subtitle = 'Inspiring stories from successful industry experts, artists, and songwriters';
  }
  render() {
    return (
      <div className={cx('home')}>
        <div className={cx('home__logo')}>
          <img className={cx('home__logo-image')} src={require('images/home.png')} />
          <div className={cx('home__logo-title')}>MWMI</div>
        </div>
        <div className={cx('home__details')}>
          <div className={cx('home__details-description')}>{this.subtitle}</div>
          <Link to={{ pathname: '/blog' }}><button className={cx('btn')}>Stream Now</button></Link>
        </div>
      </div>
    );
  }
}