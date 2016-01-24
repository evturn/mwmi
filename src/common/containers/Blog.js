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
  render() {
    return (
      <div className="blog">
        {this.renderPosts()}
        {this.renderCategories()}
        <Pagination posts={this.props.posts}/>
      </div>
    );
  }
  renderPosts() {
    return (
      <div className="posts">
        <div className="posts-header">Showing {this.props.posts.total} posts.</div>
        {this.props.posts.results.map((post, i) => {
          return (
            <div key={i} className="post-item" data-ks-editable="if-user-blah-blah-blah">
              <Link to={`/blog/${post._id}`}>{post.title}</Link>
              <div className="post-item__caption">By: {post.author.name.first} | Posted in | {post.publishedAt}</div>
              <img class="post-item__image" src={post.image.url} />
              <div class="post-item__body" dangerouslySetInnerHTML={ {__html: post.content.extended} } />
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
          {this.props.categories.map((category, i) => {
            if (i === 1) {
              return <Link key={i} to="/blog">All Categories</Link>;
            } else {
              return <Link key={i} to={category.key}>{category.name}</Link>;
            }
          })};
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  section: PropTypes.string,
  user: PropTypes.object,
  dispatch: PropTypes.func
}


function mapStateToProps(state) {
  return {
    section: state.site.section,
    posts: state.blog.posts,
    categories: state.blog.categories,
    filters: state.blog.filters,
    user: state.site.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
