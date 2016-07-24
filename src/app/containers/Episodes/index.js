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
                  src={x.image ? x.image.secure_url : Thumbnail} />
                <div className={css.title}>{x.title}</div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Episodes
