import React from 'react';
import { Link } from 'react-router';

export default ({ pageNumber, child, classname }) => {
  const pathname = pageNumber === false ? null : { pathname: '/blog', query: { page: pageNumber } };
  const onClick = pageNumber === false ? (e => e.preventDefault()) : null;

  return (
    <li className={classname}>
      <Link onClick={onClick} to={pathname}>{child}</Link>
    </li>
  );
}