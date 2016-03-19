import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Categories extends Component {
  render() {
    const { categories } = this.props;

    const showAllCategoriesLink = (
      <li className="category-item">
        <Link to={{ pathname: '/blog' }}>All Categories</Link>
      </li>
    );

    const categoryLinks = categories.map(item =>
      <li key={item.key} className="category-item">
        <Link to={{ pathname: `/blog/category/${item.key}` }}>{item.name}</Link>
      </li>
    );

    return (
      <div className="categories">
        <div className="categories-header">Categories</div>
        <ul className="categories-list">
          {showAllCategoriesLink}
          {categoryLinks}
        </ul>
      </div>
    );
  }
}