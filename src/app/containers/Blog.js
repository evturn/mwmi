import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
  dispatch: PropTypes.func.isRequired
};

Blog.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    sort: state.blog.sort,
    showing: state.blog.showing,
    posts: state.blog.posts,
    categories: state.blog.categories
  };
};

export default connect(mapStateToProps)(Blog)