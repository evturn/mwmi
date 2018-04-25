import React from 'react';
import image from '../../../static/mwmi-logo.png';
import styles from './style.css';

const Logo = props => {
  return (
    <div className={styles.root}>
      <img 
        className={styles.img}
        src={image} />
    </div>
  );
};

export default Logo;
