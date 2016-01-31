import React from 'react';
import {IndexLink, Link} from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: props.section
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      section: nextProps.section
    });
  }
  render() {
    return (
      <nav className="container navbar">
        <div className="wrapper">
          <ul className="navbar-links">{this.props.navLinks.map((link, i) => {
            const active = this.state.section === link.parent ? {fontWeight: 700} : {fontWeight: 500};
            if (link.key === 'home') {
              if (this.state.section !== 'home') {
                return <li key={link.key}><IndexLink to={link.href}>{link.label}</IndexLink></li>;
              }
            } else {
              return <li key={link.key}><Link to={link.href} style={active}>{link.label}</Link></li>;
            }
          })}</ul>
        </div>
      </nav>
    );
  }
}