import React from 'react'

import css from './styles.css'

const Episodes = ({ episodes }) => {
  return (
    <div className={css.root}>
      <ul className={css.ul}>
        {episodes.map((x, i) => (
          <li
            key={i}
            className={css.li}>
            {i % 2 === 0
              ? <a
                  className={css.link}
                  href={x.url}
                  target="_blank">
                  <div className={css.ep}>{x.episodeNumber}</div>
                  <div className={css.desc}>
                    <div className={css.guest}>{x.guest}</div>
                    <div className={css.title}>{x.title}</div>
                  </div>
                </a>
              : <a
                  className={css.li}
                  href={x.url}
                  target="_blank">
                  <div className={css.desc}>
                    <div className={css.guest}>{x.guest}</div>
                    <div className={css.title}>{x.title}</div>
                  </div>
                  <div className={css.ep}>{x.episodeNumber}</div>
                </a>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Episodes
