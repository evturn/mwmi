import React from 'react';
import { Link } from 'react-router';

export default ({posts}) => {
  return (
    <div className="posts">{posts.results.map((post, i) => {
      return (
        <div key={i} className="post-item" data-ks-editable="if-user-blah-blah-blah">
          <Link to={ {pathname: `/blog/post/${post.slug}` }}>{post.title}</Link>
          <div className="post-item__caption">By: {post.author.name.first} | Posted in | {post.publishedDate}</div>
          <img className="post-item__image" src={post.image.url} />
          <div className="post-item__body" dangerouslySetInnerHTML={ {__html: post.content.extended} } />
        </div>
      );
    })}</div>
  );
}