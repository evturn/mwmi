import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Categories from 'components/Categories';
import Pagination from 'components/Pagination';
import Post from 'components/Post';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { categories, showing, pagination } = this.props;

    return (
      <div>
        <div className="blog-content">
          <div className="posts">
            {showing.map((item, i) => <Post key={i} {...item} />)}
          </div>
          <Categories categories={categories} />
        </div>
        <Pagination {...pagination} />
      </div>
    );
  }
}

BlogPosts.propTypes = {
  showing: PropTypes.array,
  categories: PropTypes.array,
  pagination: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

BlogPosts.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    categories: state.blog.data.categories
  };
};

export default connect(mapStateToProps)(BlogPosts);