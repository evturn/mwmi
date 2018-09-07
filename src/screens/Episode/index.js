import React, { Component } from 'react';
import Logo from '../Home/Logo';

class Episode extends Component {
  render() {
    const podcastId = '5a91c59ce330c15916472f08';
    return (
      <div>
        <Logo />
        <iframe 
          src=`https://player.pippa.io/${podcastId}/episodes/${episode.id}?theme=default&cover=1&latest=1` 
          frameBorder="0" 
          width="100%" 
          height="110px" 
          allow="autoplay" />
      </div>
    );
  }
}

export default Episode;
