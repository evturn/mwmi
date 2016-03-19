import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { filterPosts } from 'actions/blog'
import Categories from 'components/Categories';
import Pagination from 'components/Pagination';
import Post from 'components/Post';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, params, sort, location: { query } } = this.props;

    dispatch(filterPosts({ params, query, sort }));
  }
  render() {
    const { categories, showing, pagination, params, location: { pathname } } = this.props;

    return (
      <div>
        <div className="blog-content">
          <div className="posts">
            {showing.map((item, i) => <Post key={i} {...item} />)}
          </div>
          <Categories categories={categories} />
        </div>
        <Pagination params={params} pathname={pathname} {...pagination} />
      </div>
    );
  }
}

BlogPosts.propTypes = {
  showing: PropTypes.array,
  categories: PropTypes.array,
  pagination: PropTypes.object,
  sort: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pagination: state.blog.pagination,
    showing: state.blog.showing,
    categories: state.blog.categories,
    sort: state.blog.sort
  };
};

export default connect(mapStateToProps)(BlogPosts);