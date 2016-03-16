import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from 'actions/blog'
import BlogPosts from 'components/BlogPosts';


class Blog extends Component {
  constructor(props){
    super(props);
  }
  componentDidUpdate(prevProps) {
    const { dispatch, params, location } = this.props

    if (params !== prevProps.params) {
      dispatch(fetchPosts(params, location.query))
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="blog">
        {this.props.children}
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  section: PropTypes.string,
  filters: PropTypes.object,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

Blog.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    posts: state.blog.data.posts,
    categories: state.blog.data.categories,
    section: state.blog.section,
    filters: state.blog.filters,
    isFetching: state.blog.isFetching,
    isCompleted: state.blog.isCompleted,
    hasOne: state.blog.hasOne
  };
};

export default connect(mapStateToProps)(Blog)