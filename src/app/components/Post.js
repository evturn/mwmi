import React from 'react';
import { Link } from 'react-router';
import BlogRouter from 'components/BlogRouter';
import moment from 'moment';

export default props => {
  const {
    slug, title, publishedDate,
    image, author, categories,
    content } = props;

  const header = (
    <div className="post-title">
      <Link to={{ pathname: `/blog/post/${slug}` }}>{title}</Link>
    </div>
  );
  const photo = image !== undefined ? <img className="post-image" src={image.url} /> : null
  const body = <div className="post-body" dangerouslySetInnerHTML={{ __html: content.extended }} />;
  const footer = (
    <div className="post-footer">
      <div className="post-author">By: <Link key={author.id} to={{ pathname: `/blog/authors/${author.name.first}` }}>{author.name.first}</Link></div>
      <ul className="post-categories">Posted in: {categories.map(item =>
        <li key={item.key} className="post-category">
          <Link to={{ pathname: `/blog/categories/${item.key}` }}>
            <BlogRouter params={{ category: item.key }}>{item.name}</BlogRouter>
          </Link>
        </li>
      )}</ul>
      <div className="post-date">{moment(publishedDate).format('MMM Do YYYY')}</div>
    </div>
  );

  return (
    <div className="post" data-ks-editable="if-user-blah-blah-blah">
      {header}
      {photo}
      {body}
      {footer}
    </div>
  );
}