import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogPosts from 'components/BlogPosts';

class Blog extends Component {
  constructor(props){
    super(props);
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
  posts: PropTypes.array,
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

function mapStateToProps(state, ownProps) {
  return {
    category: ownProps.params.category,
    author: ownProps.params.author,
    post: ownProps.params.post,
    page: ownProps.location.query.page,
    sort: state.blog.sort,
    showing: state.blog.showing,
    posts: state.blog.posts,
    categories: state.blog.categories,
    isFetching: state.blog.isFetching,
    isCompleted: state.blog.isCompleted,
    hasOne: state.blog.hasOne
  };
};

export default connect(mapStateToProps)(Blog)