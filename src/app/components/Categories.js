import React from 'react';
import { Link } from 'react-router';

export default ({ categories }) => {
  return (
    <div className="categories">
      <div className="categories-header">Categories</div>
      <ul className="categories-list">
        <li className="category-item"><Link to={{ pathname: '/blog' }}>All Categories</Link></li>
        {categories.map(item =>
          <li key={item.key} className="category-item">
            <Link to={{ pathname: `/blog/${item.key}` }}>{item.name}</Link>
          </li>
        )}</ul>
    </div>
  );
}