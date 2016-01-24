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
  componentDidMount() {
    this.props.getBlogPosts();
  }
  render() {
    console.log(this);
    return (
      <div className="container blog">
      <div className="wrapper">

        <div className="title-container">
          <p className="header"><span className="img-backend"><img className="img-scale" src="/assets/images/mi-logo-800.png" /></span> Blog</p>
        </div>
        <div className="group-desktop">
        <div className="stats-container">
          <p className="meta">Showing 4 posts.</p>
        </div>
          <div className="blog-items">
            <div className="blog-container">
              <div className="blog-item" data-ks-editable="if-user-blah-blah-blah">
                <p className="subhead"><a href="#">Tell Me About It</a></p>
                <p className="caption">By: Slappy | Posted in Nothing</p>
                <p className="read-more"><a href="#">Read more...</a></p>
              </div>
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
  renderCategories() {

    return this.categories.map((category, i) => {
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
        <li class={!this.previous ? 'disabled': ''}>
          <a href="#"><i className="fa fa-chevron-left"></i></a>
        </li>
        <li class={!this.next ? 'disabled': ''}>
          <a href="#"><i className="fa fa-chevron-right"></i></a>
        </li>
      </ul>
    )
  }
}

Blog.propTypes = {
  posts: PropTypes.array,
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
    user: state.site.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
