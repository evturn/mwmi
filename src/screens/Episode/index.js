import React, { Component } from 'react';
import Logo from '../Home/Logo';

class Episode extends Component {
  render() {
    return (
      <div>
        <Logo />
        <iframe 
          src={this.props.playerSrc}
          frameBorder="0" 
          width="100%" 
          height="110px" 
          allow="autoplay" />
      </div>
    );
  }
}

export default Episode;
