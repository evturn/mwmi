import React, { Component } from 'react'
import { Link } from 'react-router'
import Episodes from 'components/Episodes'
import classNames from 'classnames/bind'

import Trophy from './trophy.png'

import css from './styles.css'

const cx = classNames.bind(css)

class Home extends Component {
  render() {
    return (
      <div className={cx('home')}>
        <div className={cx('hero')}>
          <img className={cx('image')} src={Trophy} />
        </div>
        <Episodes />
      </div>
    )
  }
}

export default Home
