import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PaginationLink from './PaginationLink';


export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="pagination">
        <ul className="pagination-buttons">
          {this.prevPage()}
          {this.navigation()}
          {this.nextPage()}
        </ul>
      </div>
    );
  }
  nextPage() {
    const { next } = this.props.posts;

    return (
      <PaginationLink
        pageNumber={next}
        child={<i className="fa fa-chevron-right"></i>}
        classname={next === false ? 'pagination-button disabled' : 'pagination-button'}
      />
    );
  }
  prevPage() {
    const { previous } = this.props.posts;

    return (
      <PaginationLink
        pageNumber={previous}
        child={<i className="fa fa-chevron-left"></i>}
        classname={previous === false ? 'pagination-button disabled' : 'pagination-button'}
      />
    );
  }
  navigation() {
    const { pages, currentPage, totalPages } = this.props.posts;

    return pages.map((page, i) => {
      if (page === '...') {
        page = i ? totalPages : 1;
      }

      return (
        <PaginationLink
          key={i}
          pageNumber={page}
          child={page}
          classname={page === currentPage ? 'pagination-button active' : 'pagination-button'}
        />
      );
    });
  }
}