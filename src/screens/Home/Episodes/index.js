import React from 'react';
import styles from './style.css';

const Episodes = ({ episodes }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.header}>Episodes</h2>
      <div className={styles.items}>
        {episodes.map(x =>
          <div 
            className={styles.item}
            key={x._id}>
            <a 
              className={styles.link}
              href={x.url}
              target="_blank">
              <img
                className={styles.img}
                src={x.image.secure_url} />
              <div className={styles.title}>
                {x.title}
              </div>
            </a>
          </div>)}
      </div>
    </div>
  );
};

export default Episodes;
