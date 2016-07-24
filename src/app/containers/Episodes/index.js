import React from 'react'

import Thumbnail from './thumbnail.jpg'

import css from './styles.css'

const Episodes = ({ episodes }) => {
  return (
    <div className={css.root}>
      <ul className={css.ul}>
        {episodes.map((x, i) => (
          <li
            key={i}
            className={css.li}>
            <div className={css.item}>
              <a
                className={css.link}
                href={x.url}
                target="_blank">
                <img
                  className={css.thumbnail}
                  src={Thumbnail} />
                <div className={css.title}>{x.title}</div>
                <div className={css.desc}>{x.description}</div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Episodes
