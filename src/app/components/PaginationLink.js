import React from 'react';
import { Link } from 'react-router';

export default ({ pageNumber, child, active }) => {
  const on = <Link to={{ pathname: window.location.pathname, query: { page: pageNumber }}}>{child}</Link>;
  const off = <a className="disabled">{child}</a>;
  const content = pageNumber === false || active ? off : on;

  return <li className="pagination-button">{content}</li>;
}