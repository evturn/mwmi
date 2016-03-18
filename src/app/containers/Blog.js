import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { filterPosts } from 'actions/blog'
import BlogPosts from 'components/BlogPosts';


class Blog extends Component {
  constructor(props){
    super(props);
  }
  componentDidUpdate(prevProps) {
    const { dispatch, params, sort, location: { query } } = this.props;

    let filter = sort.all;

    if (params) {
      for (let param in params) {
        if (param !== 'post') {
          filter = sort[param][params[param]];
        }
      }
    }

    dispatch(filterPosts(filter));
  }
  render() {
    return (
      <div className="blog">
        {this.props.children}
      </div>
    );
  }
}

Blog.propTypes = {
  sort: PropTypes.object,
  showing: PropTypes.array,
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
    sort: state.blog.sort,
    showing: state.blog.showing,
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