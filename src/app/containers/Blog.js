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
    const { data, location } = this.props;

    return (
      <div className="blog">
        <div className="blog-content">
          <Posts posts={data.posts.results} />
          <Categories categories={data.categories} />
        </div>
        <div className="blog-content__header">Showing {data.posts.first} - {data.posts.last} of {data.posts.total}</div>
        <Pagination pathname={location.pathname} {...data} />
      </div>
    );
  }
}

Blog.propTypes = {
  section: PropTypes.string,
  filters: PropTypes.object,
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    section: state.blog.section,
    filters: state.blog.filters,
    data: state.blog.data,
    isFetching: state.blog.isFetching,
    isCompleted: state.blog.isCompleted,
    hasOne: state.blog.hasOne
  };
};

export default connect(mapStateToProps)(Blog)