import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import BlogRouter from 'components/BlogRouter';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="container navbar">
        <div className="wrapper">
          <ul className="navbar-links">
            <li><IndexLink to='/'>Home</IndexLink></li>
            <li><Link to='/blog'><BlogRouter>Blog</BlogRouter></Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;