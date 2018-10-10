import React from 'react';
import Player from './Player';
import Logo from './Logo';
import styles from './style.css';

const Home = props => {
  return (
    <div className={styles.root}>
      <Logo />
      <Player />
    </div>
  );
};

export default Home;
