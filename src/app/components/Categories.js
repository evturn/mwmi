import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/blog.less';

const cx = classNames.bind(css);

export default class Categories extends Component {
  render() {
    const { categories } = this.props;

    const showAllCategoriesLink = (
      <li className={cx('item')}>
        <Link to={{ pathname: '/blog' }}>All Categories</Link>
      </li>
    );

    const categoryLinks = categories.map(item =>
      <li key={item.key} className={cx('item')}>
        <Link to={{ pathname: `/blog/category/${item.key}` }}>{item.name}</Link>
      </li>
    );

    return (
      <div className={cx('categories')}>
        <div className={cx('header')}>Categories</div>
        <ul>
          {showAllCategoriesLink}
          {categoryLinks}
        </ul>
      </div>
    );
  }
}