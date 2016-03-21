import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { filterPosts } from 'actions/blog';
import BlogFilters from 'components/BlogFilters';
import Pagination from 'components/Pagination';
import Posts from 'components/Posts';
import classNames from 'classnames/bind';
import css from 'less/components/blog.less';

const cx = classNames.bind(css);

class BlogPosts extends Component {
  componentWillMount() {
    const { dispatch, params, query, sort } = this.props;

    dispatch(filterPosts({ params, query, sort }));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, sort } = this.props;

    if (nextProps.params !== this.props.params || nextProps.query !== this.props.query) {
      const { params, query } = nextProps;

      dispatch(filterPosts({ params, query, sort }));
    }
  }
  render() {
    const {
      categories, authors, showing,
      pagination, pathname, message } = this.props;

    const posts = (
      <div>
        <div className={cx('content')}>
          <Posts posts={showing} />
          <BlogFilters categories={categories} authors={authors} />
        </div>
        <Pagination pathname={pathname} {...pagination} />
      </div>
    );

    const noPosts = <div className={cx('no')}>{message}</div>;

    return (
      <div className={cx('blog-posts')}>
        {!message ? posts : noPosts}
      </div>
    );
  }
}

BlogPosts.propTypes = {
  showing: PropTypes.array,
  authors: PropTypes.array,
  categories: PropTypes.array,
  pagination: PropTypes.object,
  sort: PropTypes.object,
  params: PropTypes.object,
  query: PropTypes.object,
  message: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  (state, ownProps) => ({
    routing: state.routing,
    params: ownProps.params,
    query: ownProps.location.query,
    pathname: ownProps.location.pathname,
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    categories: state.blog.categories,
    authors: state.blog.authors,
    message: state.blog.message,
    sort: state.blog.sort
  })
)(BlogPosts);