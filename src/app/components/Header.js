import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

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
            <li><Link to='/blog'>Blog</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect()(Header);