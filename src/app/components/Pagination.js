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
    const { total, pages } = this.props;

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
  total: PropTypes.number,
  pages: PropTypes.number,
  first: PropTypes.number,
  last: PropTypes.number,
  buttons: PropTypes.array,
  dispatch: PropTypes.func
};

Pagination.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    total: state.blog.pagination.total,
    pages: state.blog.pagination.pages,
    first: state.blog.pagination.first,
    last: state.blog.pagination.last,
    buttons: state.blog.pagination.buttons
  };
}

export default connect(mapStateToProps)(Pagination);