import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      total, pages, next, previous, buttons,
      currentPage, first, last, params, pathname} = this.props;

    const backClass = cx({'off': !previous});
    const backHref = { pathname, query: { page: previous } };
    const back = (
      <li className="page">
        <Link className={backClass} to={backHref}>
          <span className="fa fa-chevron-left" />
        </Link>
      </li>
    );

    const forwardClass = cx({'off': !next});
    const forwardHref = { pathname, query: { page: next } }
    const forward = (
      <li className="page">
        <Link className={forwardClass} to={forwardHref}>
          <span className="fa fa-chevron-right" />
        </Link>
      </li>
    );

    const skipTo = buttons.map(page =>
      <li key={page} className="page">
        <Link
          className={cx({'off': page === currentPage})}
          to={{ pathname, query: {page} }}>
          {page}
        </Link>
      </li>
    );

    const pageResultsText = `Showing ${first} - ${last} of ${total}`;
    const pageResults = <div className="page-results">{pageResultsText}</div>;

    return (
      <div>
        {pageResults}
        <div className="pagination">
          <ul className="pages">
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
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    total: state.blog.pagination.total,
    pages: state.blog.pagination.pages,
    buttons: state.blog.pagination.buttons,
    first: state.blog.pagination.first,
    last: state.blog.pagination.last,
    previous: state.blog.pagination.previous,
    next: state.blog.pagination.next,
    currentPage: state.blog.pagination.currentPage,
    buttons: state.blog.pagination.buttons
  };
}

export default connect(mapStateToProps)(Pagination);