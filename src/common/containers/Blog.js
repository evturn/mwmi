import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import * as Actions from '../actions';
import Pagination from '../components/Pagination';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.params.category !== nextProps.params.category) {
      this.props.requestCategory(nextProps.params.category);
    }
  }
  render() {
    return (
      <div className="blog">
        <div className="blog-content">
          {this.renderHeader()}
          {this.renderPosts()}
          {this.renderCategories()}
        </div>
        {this.renderPagination()}
      </div>
    );
  }
  renderPosts() {
    return (
      <div className="posts">
        {this.props.posts.results.map((post, i) => {
          return (
            <div key={i} className="post-item" data-ks-editable="if-user-blah-blah-blah">
              <Link to={ {pathname: `/blog/post/${post.slug}` }}>{post.title}</Link>
              <div className="post-item__caption">By: {post.author.name.first} | Posted in | {post.publishedDate}</div>
              <img className="post-item__image" src={post.image.url} />
              <div className="post-item__body" dangerouslySetInnerHTML={ {__html: post.content.extended} } />
            </div>
          );
        })};
      </div>
    )
  }
  renderCategories() {
    return (
      <div className="categories">
        <div className="categories-header">Categories</div>
          <ul className="categories-list">
            <li className="category-item"><Link to="/blog"><span className="category-item__link">All Categories</span></Link></li>
            {this.props.categories.map((category, i) => {
              return <li key={i} className="category-item"><Link to={{ pathname: `/blog/${category.key}` }}><span className="category-item__link">{category.name}</span></Link></li>;
            })}
          </ul>
      </div>
    );
  }
  renderHeader() {
    return <div className="blog-content__header">Showing {this.props.posts.first} of {this.props.posts.total}</div>;
  }
  renderPagination() {
    if (this.props.completed) {
      return <Pagination posts={this.props.posts}/>;
    }

  }
}

Blog.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  filters: PropTypes.object,
  post: PropTypes.object,
  category: PropTypes.object,
  isFetching: PropTypes.bool,
  completed: PropTypes.bool,
  dispatch: PropTypes.func
}


function mapStateToProps(state) {
  return {
    posts: state.reducer.posts,
    categories: state.reducer.categories,
    filters: state.reducer.filters,
    post: state.reducer.post,
    category: state.reducer.category,
    isFetching: state.reducer.isFetching,
    completed: state.reducer.completed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
