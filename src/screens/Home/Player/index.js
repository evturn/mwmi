import React from 'react';
import styles from './style.css';

const Player = props => {
  return (
    <div className={styles.root}>
      <iframe 
        width="80%"
        height="400px"
        src="https://player.pippa.io/5a91c59ce330c15916472f08?theme=default&cover=1&latest=1" />
    </div>
  );
};

export default Player;
