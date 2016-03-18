import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterPosts } from 'actions/blog';
import { Link } from 'react-router';
import BlogRouter from 'components/BlogRouter';
import cx from 'classnames';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      total, pages, buttons,
      currentPage, next, previous,
      first, last, params, pathname } = this.props;

    return (
      <div>
        <div className="blog-content__header">Showing {first} - {last} of {total}</div>
        <div className="pagination">
          <ul className="pages">
            <li className="page">
              <Link
                className={cx({'off': !previous})}
                to={{ pathname, query: { page: previous } }}>
                <BlogRouter params={params} query={{ page: previous }}>
                  <span className="fa fa-chevron-left" />
                </BlogRouter>
              </Link>
            </li>

              {buttons.map(page => {
                return (
                  <li key={page} className="page">
                    <Link
                      className={cx({'off': page === currentPage})}
                      to={{ pathname, query: {page} }}>
                      <BlogRouter params={params} query={{ page }}>
                        {page}
                      </BlogRouter>
                    </Link>
                  </li>
                );
              })}

            <li className="page">
              <Link
                className={cx({'off': !next})}
                to={{ pathname, query: { page: next } }}>
                <BlogRouter params={params} query={{ page: next }}>
                  <span className="fa fa-chevron-right" />
                </BlogRouter>
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