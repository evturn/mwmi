import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default props => {
  const {
    slug, title, publishedDate,
    image, author, categories,
    content } = props;

  const date = moment(publishedDate).format('MMM Do YYYY');

  const header = (
    <div className="entry__header">
      <div className="entry__header-title">
        <Link to={{ pathname: `/blog/post/${slug}` }}>{title}</Link>
      </div>
      <div className="entry__header-caption">{date}</div>
    </div>
  );

  const photo = image !== undefined ? <img className="entry__image" src={image.url} /> : null

  const body = <div className="entry__body" dangerouslySetInnerHTML={{ __html: content.extended }} />;

  const footer = (
    <div className="entry__footer">
      <div className="entry__footer-author">By: <Link key={author.id} to={{ pathname: `/blog/authors/${author.name.first}` }}>{author.name.first}</Link></div>
      <div className="entry__footer-categories">Posted in | {categories.map(item =>
        <Link key={item.key} to={{ pathname: `/blog/categories/${item.key}` }}>{item.name}</Link>
      )}</div>
    </div>
  );

  return (
    <div className="entry" data-ks-editable="if-user-blah-blah-blah">
      {header}
      {photo}
      {body}
      {footer}
    </div>
  );
}