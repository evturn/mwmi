import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      next, previous, pages, location,
      currentPage, totalPages, total } = this.props;

    return (
      <div className="pagination">
        <ul className="pagination-buttons">
          <li className="pagination-button">
            <Link
              className={cx({'disabled': !previous})}
              to={{ pathname: location.pathname, query: { page: previous } }}>
              <span className="fa fa-chevron-left" />
            </Link>
          </li>

          {pages.map((page, i) => {
            if (page === '...') {
              page = i ? totalPages : 1;
            }

            return (
              <li key={i} className="pagination-button">
                <Link
                  className={cx({'disabled': page === currentPage})}
                  to={{ pathname: location.pathname, query: { page: page } }}>{page}</Link>
              </li>
            );
          })}

          <li className="pagination-button">
            <Link
              className={cx({'disabled': !next})}
              to={{ pathname: location.pathname, query: { page: next } }}>
              <span className="fa fa-chevron-right" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}