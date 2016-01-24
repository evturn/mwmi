import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Actions from '../actions';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.previous = false;
    this.next = true;
    this.categories = [
      {key: 'Dudez', name: 'Dudex'},
      {key: 'Fudez', name: 'Fudex'},
      {key: 'Cudez', name: 'Cudex'}
    ];
  }
  render() {
    return (
      <div className="container blog">
      <div className="wrapper">

        <div className="title-container">
          <p className="header"><span className="img-backend"><img className="img-scale" src="/assets/images/mi-logo-800.png" /></span> Blog</p>
        </div>
        <div className="group-desktop">
        <div className="stats-container">
          <p className="meta">Showing {this.props.posts.total} posts.</p>
        </div>
          <div className="blog-items">
            <div className="blog-container">
              {this.renderPosts()}
            </div>
          </div>
          <div className="categories">
            <div className="inner">
              <div className="categories-container">
                <div className="title-container">
                  <p className="subhead">Categories</p>
                </div>
                <div className="category-item">
                  <p className="meta"><a href="/blog">All Categories</a></p>
                </div>
                {this.renderCategories()}
              </div>
            </div>
          </div>
        </div>

        <div className="pagination">
          {this.renderPagination()}
        </div>
      </div>
    </div>
    );
  }
  renderPosts() {
    return this.props.posts.results.map((post, i) => {
      return (
        <div key={i} className="blog-item" data-ks-editable="if-user-blah-blah-blah">
          <p className="subhead"><a href={`/blog/${post._id}`}>{post.title}</a></p>
          <p className="caption">By: {post.author.name.first} | Posted in | {post.publishedAt}</p>
          <img class="img-scale" src={post.image.url} />
          <div dangerouslySetInnerHTML={ {__html: post.content.extended} } />
        </div>
      );
    });
  }
  renderCategories() {
    return this.props.categories.map((category, i) => {
      return (
        <div key={i} className="category-item">
          <p className="meta"><a href={category.key}>{category.name}</a></p>
        </div>
      );
    });
  }
  renderPagination() {

    return (
      <ul>
        <li class={!this.props.posts.previous ? 'disabled': ''}>
          <a href="#"><i className="fa fa-chevron-left"></i></a>
        </li>
        <li class={!this.props.posts.next ? 'disabled': ''}>
          <a href="#"><i className="fa fa-chevron-right"></i></a>
        </li>
      </ul>
    )
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
