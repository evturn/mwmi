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
      total, pages, buttons,
      currentPage, next, previous,
      first, last } = this.props;

    return (
      <div>
        <div className="blog-content__header">Showing {first} - {last} of {total}</div>
        <div className="pagination">
          <ul className="pages">
            <li className="page">
              <Link
                className={cx({'off': !previous})}
                to={{ pathname: '/blog', query: { page: previous } }}>
                <span className="fa fa-chevron-left" />
              </Link>
            </li>

              {buttons.map(page => {
                return (
                  <li key={page} className="page">
                    <Link
                      className={cx({'off': page === currentPage})}
                      to={{ pathname: '/blog', query: {page} }}>{page}</Link>
                  </li>
                );
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
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  pages: PropTypes.number,
  first: PropTypes.number,
  last: PropTypes.number,
  currentPage: PropTypes.number,
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
    previous: state.blog.pagination.previous,
    next: state.blog.pagination.next,
    currentPage: state.blog.pagination.currentPage,
    buttons: state.blog.pagination.buttons
  };
}

export default connect(mapStateToProps)(Pagination);