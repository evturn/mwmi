import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default ({posts}) => {
  return (
    <div className="posts">{posts.results.map((post, i) => {
      return (
        <div key={i} className="post-item" data-ks-editable="if-user-blah-blah-blah">
          <Link to={ {pathname: `/blog/post/${post.slug}` }}>{post.title}</Link>
          <div className="post-item__caption">By: {post.author.name.first} | {moment(post.publishedDate).format('MMM Do YY')}</div>
          <img className="post-item__image" src={post.image.url} />
          <div className="post-item__body" dangerouslySetInnerHTML={ {__html: post.content.extended} } />
          <div className="post-item__categories">Posted in | {post.categories.map((category, i) => {
            return <Link key={i} to={{ pathname: `/blog/${category.key}` }}>{category.name}</Link>;
          })}</div>
        </div>
      );
    })}</div>
  );
}