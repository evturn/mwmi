import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import classNames from 'classnames/bind';
import css from 'less/components/post.less';

const cx = classNames.bind(css);

export default props => {
  const {
    slug, title, publishedDate,
    image, author, categories,
    content } = props;

  const header = (
    <div className={cx('post-title')}>
      <Link to={{ pathname: `/blog/post/${slug}` }}>{title}</Link>
    </div>
  );
  const photo = image !== undefined ? <img className={cx('post-image')} src={image.url} /> : null
  const body = <div className={cx('post-body')} dangerouslySetInnerHTML={{ __html: content.extended }} />;
  const footer = (
    <div className={cx('post-footer')}>
      <div className={cx('post-author')}>By: <Link key={author.id} to={{ pathname: `/blog/author/${author.name.first}` }}>{author.name.first}</Link></div>
      <ul className={cx('post-categories')}>Posted in: {categories.map(item =>
        <li key={item.key} className={cx('post-category')}>
          <Link to={{ pathname: `/blog/category/${item.key}` }}>{item.name}</Link>
        </li>
      )}</ul>
      <div className={cx('post-date')}>{moment(publishedDate).format('MMM Do YYYY')}</div>
    </div>
  );

  return (
    <div className={cx('post')} data-ks-editable="if-user-blah-blah-blah">
      {header}
      {photo}
      {body}
      {footer}
    </div>
  );
}