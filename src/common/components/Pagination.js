import React from 'react';
import {Link} from 'react-router';

export default class Pagination extends React.Component {
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
}