import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PaginationLink from './PaginationLink';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { next, previous, pages, currentPage, totalPages } = this.props.posts;

    return (
      <div className="pagination">
        <ul className="pagination-buttons">
          <PaginationLink
            pageNumber={previous}
            child={<i className="fa fa-chevron-left"></i>}
          />
          { pages.map((page, i) => {
            if (page === '...') { page = i ? totalPages : 1; }
            const active = page === currentPage ? 'active' : '';
            return (
              <PaginationLink
                key={i}
                pageNumber={page}
                child={page}
                active={active}
              />
            );
          }) }
          <PaginationLink
            pageNumber={next}
            child={<i className="fa fa-chevron-right"></i>}
          />
        </ul>
      </div>
    );
  }
}