import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import { Link } from 'react-router';
import Posts from '../components/Posts';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

class Blog extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(fetchPosts(params));
  }
  componentDidUpdate(prevProps) {
    const { dispatch, params, location } = this.props

    if (params !== prevProps.params) {
      dispatch(fetchPosts(params, location.query))
    }
  }
  render() {
    const {
      posts, categories,
      pagination, location } = this.props

    return (
      <div className="blog">
        <div className="blog-content">
          <Posts posts={posts} />
          <Categories categories={categories} />
        </div>
        <div className="blog-content__header">Showing {pagination.first} - {pagination.last} of {pagination.total}</div>
        <Pagination {...pagination} pathname={location.pathname} />
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.array,
  post: PropTypes.object,
  categories: PropTypes.array,
  category: PropTypes.object,
  pagination: PropTypes.object,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    post: state.blog.post,
    categories: state.blog.categories,
    category: state.blog.category,
    pagination: state.blog.pagination,
    isFetching: state.blog.isFetching,
    isCompleted: state.blog.isCompleted
  };
};

export default connect(mapStateToProps)(Blog)