import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'

import css from './styles.css'

const cx = classNames.bind(css)

class Episodes extends Component {
  render() {
    return (
      <div className={cx('root')}>
        <ul className={cx('ul')}>{this.props.episodes.map((x, i) =>
          <li key={i} className={cx('li')}>
            {i % 2 === 0 ? (
              <a className={css.link} href={x.url} target="_blank">
                <div className={cx('ep')}>{x.episodeNumber}</div>
                <div className={cx('desc')}>
                  <div className={cx('guest')}>{x.guest}</div>
                  <div className={cx('title')}>{x.title}</div>
                </div>
              </a>
            ) : (
              <a href={x.url} target="_blank">
                <div className={cx('desc')}>
                  <div className={cx('guest')}>{x.guest}</div>
                  <div className={cx('title')}>{x.title}</div>
                </div>
                <div className={cx('ep')}>{x.episodeNumber}</div>
              </a>
            )}
          </li>
       )}</ul>
      </div>
    )
  }
}

export default Episodes

Episodes.propTypes = {
  episodes: PropTypes.array
}

export default connect(
  state => ({
    episodes: state.app.episodes
  })
)(Episodes)
