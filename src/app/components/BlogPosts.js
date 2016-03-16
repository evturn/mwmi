import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Categories from 'components/Categories';
import Pagination from 'components/Pagination';
import Post from 'components/Post';

export default class BlogPosts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts, categories, pathname } = this.props;

    return (
      <div>
        <div className="blog-content">
          <div className="posts">
            {posts.results.map((item, i) => <Post key={i} {...item} />)}
          </div>
          <Categories categories={categories} />
        </div>
        <div className="blog-content__header">Showing {posts.first} - {posts.last} of {posts.total}</div>
        <Pagination
          pathname={pathname}
          posts={posts}
          categories={categories}
        />
      </div>
    );
  }
}

BlogPosts.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  section: PropTypes.string,
  filters: PropTypes.object,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

BlogPosts.contextTypes = {
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

export default connect(mapStateToProps)(BlogPosts);