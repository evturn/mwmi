import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/pagination.less';

const cx = classNames.bind(css);

class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      total, pages, next, previous, buttons,
      currentPage, first, last, pathname} = this.props;

    const backClass = cx({'off': !previous});
    const backHref = { pathname, query: { page: previous } };
    const back = (
      <li className={cx('page')}>
        <Link className={backClass} to={backHref}>
          <span className="fa fa-chevron-left" />
        </Link>
      </li>
    );

    const forwardClass = cx({'off': !next});
    const forwardHref = { pathname, query: { page: next } }
    const forward = (
      <li className={cx('page')}>
        <Link className={forwardClass} to={forwardHref}>
          <span className="fa fa-chevron-right" />
        </Link>
      </li>
    );

    const skipTo = buttons.map(page =>
      <li key={page} className={cx('page')}>
        <Link
          className={cx({'off': page === currentPage})}
          to={{ pathname, query: {page} }}>
          {page}
        </Link>
      </li>
    );

    const pageResultsText = `Showing ${first} - ${last} of ${total}`;
    const pageResults = <div className={cx('page-results')}>{pageResultsText}</div>;

    return (
      <div>
        {pageResults}
        <div className={cx('pagination')}>
          <ul className={cx('pages')}>
            {back}
            {skipTo}
            {forward}
          </ul>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  pages: PropTypes.number,
  buttons: PropTypes.array,
  first: PropTypes.number,
  last: PropTypes.number,
  currentPage: PropTypes.number,
  pathname: PropTypes.string,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    total: state.blog.pagination.total,
    pages: state.blog.pagination.pages,
    buttons: state.blog.pagination.buttons,
    first: state.blog.pagination.first,
    last: state.blog.pagination.last,
    previous: state.blog.pagination.previous,
    next: state.blog.pagination.next,
    currentPage: state.blog.pagination.currentPage
  })
)(Pagination);