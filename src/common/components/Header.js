import React from 'react';
import {IndexLink, Link} from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.navLinks = [
      { label: 'Home',      key: 'home',      href: '/',        parent: 'home' },
      { label: 'Blog',      key: 'blog',      href: '/blog',    parent: 'blog' },
      { label: 'Gallery',   key: 'gallery',   href: '/gallery', parent: 'gall' },
      { label: 'Contact',   key: 'contact',   href: '/contact', parent: 'cont' }
    ];
  }
  render() {
    return (
      <nav className="container navbar">
        <div className="wrapper">
          <ul className="navbar-links">{this.navLinks.map((link, i) => {
            if (link.key === 'home') {
              return <li key={link.key}><IndexLink to={link.href}>{link.label}</IndexLink></li>;
            } else {
              return <li key={link.key}><Link to={link.href}>{link.label}</Link></li>;
            }
          })}</ul>
        </div>
      </nav>
    );
  }
}