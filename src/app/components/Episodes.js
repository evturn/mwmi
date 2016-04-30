import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import css from 'less/components/episodes.less'

const cx = classNames.bind(css)

class Episodes extends Component {
  render() {
    console.log(this.props.podcast)
    return (
      <div className={cx('root')}>
        <ul className={cx('ul')}>{this.props.podcast.map((x, i) =>
          <li key={i} className={cx('li')}>
            {i % 2 === 0 ? (
              <div>
                <div className={cx('ep')}>{x.episodeNumber}</div>
                <div className={cx('guest')}>{x.guest}</div>
              </div>
            ) : (
              <div>
                <div className={cx('guest')}>{x.guest}</div>
                <div className={cx('ep')}>{x.episodeNumber}</div>
              </div>
            )}
            <div><a href={x.url} target="_blank">{x.title}</a></div>
          </li>
       )}</ul>
      </div>
    )
  }
}

export default Episodes

Episodes.propTypes = {
  podcast: PropTypes.array
}

export default connect(
  (state) => ({
    podcast: state.podcast
  })
)(Episodes);