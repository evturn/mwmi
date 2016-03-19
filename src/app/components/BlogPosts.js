import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { filterPosts, refilterPosts } from 'actions/blog'
import Categories from 'components/Categories';
import Pagination from 'components/Pagination';
import Post from 'components/Post';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { dispatch, params, sort, query } = this.props;

    dispatch(filterPosts({ params, query, sort }));
  }
  componentWillUpdate(nextProps) {
    const { params, query, dispatch, sort } = this.props;
    const changedParams = nextProps.params !== params;
    const changedQuery = nextProps.query !== query;

    if (!changedParams || !changedQuery) {
      return;
    }

    let page;
    let posts;

    if (nextProps.query.page) {
      page = parseInt(nextProps.query.page);
    } else {
      page = 1;
    }

    if (nextProps.params.author) {
      posts = sort.author[nextProps.params.author];
    } else if (nextProps.params.category) {
      posts = sort.category[nextProps.params.category];
    } else {
      posts = sort.all;
    }

    dispatch(refilterPosts({ posts, page }));
  }
  render() {
    const { categories, showing, pagination, params, location: { pathname } } = this.props;

    return (
      <div>
        <div className="blog-content">
          <div className="posts">
            {showing.map((item, i) => <Post key={i} {...item} />)}
          </div>
          <Categories categories={categories} />
        </div>
        <Pagination params={params} pathname={pathname} {...pagination} />
      </div>
    );
  }
}

BlogPosts.propTypes = {
  showing: PropTypes.array,
  categories: PropTypes.array,
  pagination: PropTypes.object,
  sort: PropTypes.object,
  params: PropTypes.object,
  query: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

BlogPosts.contextTypes = {
  store: PropTypes.object
};

export default connect(
  (state, ownProps) => ({
    params: ownProps.params,
    query: ownProps.location.query,
    pathname: ownProps.location.pathname,
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    categories: state.blog.categories,
    sort: state.blog.sort
  })
)(BlogPosts);