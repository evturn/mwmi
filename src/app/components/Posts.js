import React from 'react';
import { Link } from 'react-router';
import Post from './Post';

export default ({ posts }) => {
  return (
    <div className="posts">{posts.map((item, i) =>
      <Post key={i} {...item} />
    )}</div>
  );
}