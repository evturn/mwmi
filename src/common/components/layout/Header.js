import React from 'react';
import {IndexLink, Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="container navbar">
        <div className="wrapper">
          <ul className="navbar-links">
            <li><IndexLink to={'/'}>Home</IndexLink></li>
            <li><Link to={'blog'}>Blog</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
