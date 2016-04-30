import React, { Component } from 'react'
import { Link } from 'react-router'
import Episodes from 'components/Episodes'
import classNames from 'classnames/bind'
import css from 'less/components/home.less'

const cx = classNames.bind(css)

export default class Home extends Component {
  render() {
    return (
      <div className={cx('home')}>
        <div className={cx('hero')}>
          <img className={cx('image')} src={require('images/trophy.png')} />
        </div>
        <Episodes />
      </div>
    )
  }
}