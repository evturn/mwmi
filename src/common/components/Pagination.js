import React from 'react';
import {Link} from 'react-router';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="pagination">
        <ul>
          <li class={!this.props.posts.previous ? 'disabled': ''}>
            <Link to={this.previousUrl()}><i className="fa fa-chevron-left"></i></Link>
          </li>
          <li class={!this.props.posts.next ? 'disabled': ''}>
            <Link to={this.nextUrl()}><i className="fa fa-chevron-right"></i></Link>
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