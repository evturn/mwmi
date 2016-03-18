import React from 'react';
import { IndexLink, Link } from 'react-router';
import BlogRouter from 'components/BlogRouter';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.navLinks = [
      { label: 'Home',      key: 'home',      href: '/',        parent: 'home' },
      { label: 'Blog',      key: 'blog',      href: '/blog',    parent: 'blog' },
      { label: 'Contact',   key: 'contact',   href: '/contact', parent: 'cont' }
    ];
  }
  render() {
    const home = <li><IndexLink to='/'>Home</IndexLink></li>;
    const blog = <li><Link to='/blog'><BlogRouter>Blog</BlogRouter></Link></li>;
    const enquiry = <li><Link to='/contact'>Contact</Link></li>;

    return (
      <nav className="container navbar">
        <div className="wrapper">
          <ul className="navbar-links">
            {home}
            {blog}
            {enquiry}
          </ul>
        </div>
      </nav>
    );
  }
}