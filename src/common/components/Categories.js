import React from 'react';
import { Link } from 'react-router';

export default ({categories}) => {
  return (
    <ul className="categories-list">
      <li className="category-item"><Link to={{ pathname: '/blog' }}>All Categories</Link></li>
      {categories.map((category, i) => {
        return (
          <li key={i} className="category-item">
            <Link to={{ pathname: `/blog/${category.key}` }}>{category.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}