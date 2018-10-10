import React from 'react';
import styles from './style.css';

const Footer = props => {
  return (
    <footer className={styles.root}>
      <span className={styles.text}>
        Mama We Made It | © {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;

