import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames/bind'
import css from 'less/components/blog.less'

const cx = classNames.bind(css)

export default class BlogFilters extends Component {
  render() {
    const { categories, authors } = this.props

    const categoryLinks = categories.map(item =>
      <li key={item.key} className={cx('item')}>
        <Link to={{ pathname: `/blog/category/${item.key}` }}>{item.name}</Link>
      </li>
    )

    const authorLinks = authors.map(item =>
      <li key={item.username} className={cx('item')}>
        <Link to={{ pathname: `/blog/author/${item.username}` }}>{item.name.first}</Link>
      </li>
    )

    return (
      <div className={cx('filters')}>
        <div className={cx('filter')}>
          <ul>
            <li className={cx('item', 'header')}>Categories</li>
            {categoryLinks}
          </ul>
        </div>
        <div className={cx('filter')}>
          <ul>
            <li className={cx('item', 'header')}>Authors</li>
            {authorLinks}
          </ul>
        </div>
      </div>
    )
  }
}