import React from 'react';
import { Link } from 'react-router';

export default ({categories}) => {
  return (
    <ul className="categories-list">
      <li className="category-item"><Link to="/blog"><span className="category-item__link">All Categories</span></Link></li>
      {categories.map((category, i) => {
        return (
          <li key={i} className="category-item">
            <Link to={{ pathname: `/blog/${category.key}` }}>
              <span className="category-item__link">{category.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}