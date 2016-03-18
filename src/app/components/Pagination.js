import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setPagination } from 'actions/blog';
import { Link } from 'react-router';
import cx from 'classnames';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { total, pages } = this.props.pagination;

    const previous = false;
    const next = false;

    return (
      <div>
        <div className="blog-content__header">Showing 1 - 2 of {total}</div>
        <div className="pagination">
          <ul className="pages">
            <li className="page">
              <Link
                className={cx({'off': !previous})}
                to={{ pathname: '/blog', query: { page: previous } }}>
                <span className="fa fa-chevron-left" />
              </Link>
            </li>

              {pages}

            <li className="page">
              <Link
                className={cx({'off': !next})}
                to={{ pathname: '/blog', query: { page: next } }}>
                <span className="fa fa-chevron-right" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  dispatch: PropTypes.func
};

Pagination.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    pagination: state.blog.pagination
  };
}

export default connect(mapStateToProps)(Pagination);