import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      slug, title, publishedDate,
      image, author, categories,
      content } = this.props;

    return (
      <div className="entry" data-ks-editable="if-user-blah-blah-blah">
        <div className="entry__header">
          <div className="entry__header-title">
            <Link to={{ pathname: `/blog/post/${slug}` }}>{title}</Link>
          </div>
          <div className="entry__header-caption">{moment(publishedDate).format('MMM Do YYYY')}</div>
        </div>
        {image !== undefined ? <img className="entry__image" src={image.url} /> : null}
        <div className="entry__body" dangerouslySetInnerHTML={{ __html: content.extended }} />
        <div className="entry__footer">
          <div className="entry__footer-author">By: {author.name.first}</div>
          <div className="entry__footer-categories">Posted in | {categories.map(item =>
            <Link key={item.key} to={{ pathname: `/blog/${item.key}` }}>{item.name}</Link>
          )}</div>
        </div>
      </div>
    );
  }
}