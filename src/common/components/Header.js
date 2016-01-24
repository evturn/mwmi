import React from 'react';
import {IndexLink, Link} from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <nav className="container navbar">
        <div className="wrapper">
          <ul className="navbar-links">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
  renderLinks() {
    return this.props.links.map((link, i) => {
      if (link.key === 'home') {
        return <li key={link.key}><IndexLink to={link.href}>{link.label}</IndexLink></li>;
      } else {
        return <li key={link.key}><Link to={link.href}>{link.label}</Link></li>;
      }
    })
  }
}