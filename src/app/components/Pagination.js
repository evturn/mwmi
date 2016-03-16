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
      next, last, previous,
      pages, results, total,
      totalPages, currentPage } = this.props.posts;

    return (
      <div className="pagination">
        <ul className="pages">
          <li className="page">
            <Link
              className={cx({'off': !previous})}
              to={{ pathname: '/blog', query: { page: previous } }}>
              <span className="fa fa-chevron-left" />
            </Link>
          </li>

          {pages.map((num, i) => {
            num = (num === '...') ? i ? totalPages : 1 : num;

            return (
              <li key={i} className="page">
                <Link
                  className={cx({'off': num === currentPage})}
                  to={{ pathname: '/blog', query: { page: num } }}>{num}</Link>
              </li>);
          })}

          <li className="page">
            <Link
              className={cx({'off': !next})}
              to={{ pathname: '/blog', query: { page: next } }}>
              <span className="fa fa-chevron-right" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  next: PropTypes.number,
  last: PropTypes.number,
  previous: PropTypes.number,
  pages: PropTypes.array,
  results: PropTypes.array,
  total: PropTypes.number,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  dispatch: PropTypes.func
};

Pagination.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    next: state.pagination.next,
    last: state.pagination.last,
    previous: state.pagination.previous,
    pages: state.pagination.pages,
    results: state.pagination.results,
    total: state.pagination.total,
    totalPages: state.pagination.totalPages,
    currentPage: state.pagination.currentPage
  }
}

export default connect(mapStateToProps)(Pagination);