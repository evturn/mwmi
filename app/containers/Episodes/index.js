import React from 'react'

const fallbackImg = [
  'https://res.cloudinary.com/mamawemadeit-com/image/upload/v1469381319/fqafiw8mzdzs2ozcx0xm.png',
  'https://res.cloudinary.com/mamawemadeit-com/image/upload/v1469383024/nuxyttfrvu8az9z304sk.png',
]

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
                  src={x.image ? x.image.secure_url : fallbackImg[Math.ceil(Math.random() * 100) % 2]} />
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
