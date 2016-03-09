import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      next, previous, pages, pathname,
      currentPage, totalPages, total } = this.props;

    return (
      <div className="pagination">
        <ul className="pages">
          <li className="page">
            <Link
              className={cx({'off': !previous})}
              to={{ pathname, query: { page: previous } }}>
              <span className="fa fa-chevron-left" />
            </Link>
          </li>

          {pages.map((num, i) => {
            num = (num === '...') ? i ? totalPages : 1 : num;

            return (<li key={i} className="page">
                <Link
                  className={cx({'off': num === currentPage})}
                  to={{ pathname, query: { page: num } }}>{num}</Link>
              </li>);
          })}

          <li className="page">
            <Link
              className={cx({'off': !next})}
              to={{ pathname, query: { page: next } }}>
              <span className="fa fa-chevron-right" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}