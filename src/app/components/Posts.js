import React from 'react';
import { Link } from 'react-router';
import Post from './Post';

export default ({ posts }) => {
  return (
    <div className="posts">{posts.map(item =>
      <Post
        key={item.publishedDate}
        slug={item.slug}
        title={item.title}
        author={item.author}
        publishedDate={item.publishedDate}
        image={item.image}
        content={item.content}
        categories={item.categories}
      />
    )}</div>
  );
}