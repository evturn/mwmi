import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { filterPosts } from 'actions/blog';
import Categories from 'components/Categories';
import Pagination from 'components/Pagination';
import Post from 'components/Post';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
  }
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
    const { categories, showing, pagination, pathname } = this.props;

    return (
      <div>
        <div className="blog-content">
          <div className="posts">{showing.map((item, i) =>
            <Post key={i} {...item} />)}
          </div>
          <Categories categories={categories} />
        </div>
        <Pagination pathname={pathname} {...pagination} />
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

export default connect(
  (state, ownProps) => ({
    routing: state.routing,
    params: ownProps.params,
    query: ownProps.location.query,
    pathname: ownProps.location.pathname,
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    categories: state.blog.categories,
    sort: state.blog.sort
  })
)(BlogPosts);