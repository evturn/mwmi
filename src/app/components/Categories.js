import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import BlogRouter from 'components/BlogRouter';

export default class Categories extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="categories">
        <div className="categories-header">Categories</div>
        <ul className="categories-list">
          <li className="category-item">
            <Link to={{ pathname: '/blog' }}><BlogRouter>All Categories</BlogRouter></Link>
          </li>
          {categories.map(item =>
            <li key={item.key} className="category-item">
              <Link to={{ pathname: `/blog/categories/${item.key}` }}>
                <BlogRouter params={{ category: item.key }}>
                  {item.name}
                </BlogRouter>
              </Link>
            </li>
          )}</ul>
      </div>
    );
  }
}