import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import cx from 'classnames';

export default props => {
    const {
      next, previous, pages,
      currentPage, totalPages, total } = props;

    return (
      <div className="pagination">
        <ul className="pagination-buttons">
          <li className="pagination-button">
            <Link className={cx({'disabled': !previous})} to={{ pathname: window.location.pathname, query: { page: previous } }}>
              <span className="fa fa-chevron-left" />
            </Link>
          </li>

          {pages.map((page, i) => {
            if (page === '...') {
              page = i ? totalPages : 1;
            }

            return (
              <li key={i} className="pagination-button">
                <Link to={{ pathname: window.location.pathname, query: { page: page } }} className={cx({'disabled': page === currentPage})}>{page}</Link>
              </li>
            );
          })}

          <li className="pagination-button">
            <Link className={cx({'disabled': !next})} to={{ pathname: window.location.pathname, query: { page: next } }}>
              <span className="fa fa-chevron-right" />
            </Link>
          </li>
        </ul>
      </div>
    );
}