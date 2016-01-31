import React from 'react';
import { Link } from 'react-router';
import Entry from './Entry';

export default ({posts}) => {
  return (
    <div className="posts">{posts.results.map((post, i) => {
      return (
        <Entry
          key={i}
          slug={post.slug}
          title={post.title}
          author={post.author}
          publishedDate={post.publishedDate}
          image={post.image}
          content={post.content}
          categories={post.categories}
        />
      );
    })}</div>
  );
}