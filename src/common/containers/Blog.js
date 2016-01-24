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
        <div className="blog-content">
          <div className="blog-content__header">Showing {this.props.posts.first} of {this.props.posts.total}</div>
          {this.renderPosts()}
          {this.renderCategories()}
        </div>
        <Pagination posts={this.props.posts}/>
      </div>
    );
  }
  renderPosts() {
    return (
      <div className="posts">
        {this.props.posts.results.map((post, i) => {
          return (
            <div key={i} className="post-item" data-ks-editable="if-user-blah-blah-blah">
              <Link to={`/blog/post/${post.slug}`}>{post.title}</Link>
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
              return <li key={i} className="category-item"><Link to={`/blog`} query={{category: category.key}}><span className="category-item__link">{category.name}</span></Link></li>;
            })}
          </ul>
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
