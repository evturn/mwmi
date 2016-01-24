import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const previousClass = !this.props.posts.previous ? 'disabled': '';
    const nextClass = !this.props.posts.next ? 'disabled': '';
    return (
      <div className="pagination">
        <ul className="pagination-buttons">
          <li className="pagination-button">
            <Link to={this.previousUrl()}><i className={`${previousClass} fa fa-chevron-left`}></i></Link>
          </li>
          {this.navigation()}
          <li className="pagination-button">
            <Link to={this.nextUrl()}><i className={`${nextClass} fa fa-chevron-right`}></i></Link>
          </li>
        </ul>
      </div>
    );
  }
  pageUrl(pageNumber) {
    return `/blog?page=${pageNumber}`;
  }
  previousUrl() {
    if (this.props.posts.previous === false) {
      return this.pageUrl(1)
    }
    return this.pageUrl(this.props.posts.previous);
  }
  nextUrl() {
    if (this.props.posts.next === false) {
      return this.pageUrl(this.props.posts.totalPages);
    }
    return this.pageUrl(this.props.posts.next);
  }
  navigation() {
    return this.props.posts.pages.map((page, i) => {
      const pageText = page;
      const liClass = page === this.props.posts.currentPage ? 'active' : '';

      if (page === '...') {
        page = i ? this.props.posts.totalPages : 1;
      }
      return <li key={i} className={`pagination-button ${liClass}`}><Link to={this.pageUrl(page)}>{pageText}</Link></li>;
    });
  }
}

Pagination.propTypes = {
  posts: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func
}


function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    user: state.site.user
  };
}

export default connect(mapStateToProps)(Pagination);