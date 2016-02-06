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
    const { dispatch, params } = this.props

    if (params !== prevProps.params) {
      dispatch(fetchPosts(params));
    }
  }
  render() {
    const { isFetching, isCompleted } = this.props;

    return (
      <div>{!isFetching && isCompleted ? this.renderContent() : null}</div>
    );
  }
  renderContent() {
    return (
      <div className="blog">
        <div className="blog-content">
          <div className="blog-content__header">Showing {this.props.posts.first} - {this.props.posts.last} of {this.props.results.length}</div>
          <Posts posts={this.props.results} />
          <div className="categories">
            <div className="categories-header">Categories</div>
            <Categories categories={this.props.categories} />
          </div>
        </div>
        <Pagination posts={this.props.posts}/>
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  category: PropTypes.object,
  results: PropTypes.array,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    categories: state.blog.categories,
    category: state.blog.category,
    results: state.blog.results,
    isFetching: state.blog.isFetching,
    isCompleted: state.blog.isCompleted,
    lastUpdated: state.blog.lastUpdated
  };
};

export default connect(mapStateToProps)(Blog)