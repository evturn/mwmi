import React from 'react';
import styles from './style.css';

const Episodes = ({ episodes }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Episodes</h2>
      {episodes.map(x =>
        <div key={x._id}>{x.title}</div>)}
    </div>
  );
};

export default Episodes;
