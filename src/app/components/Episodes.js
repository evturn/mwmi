import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import css from 'less/components/episodes.less'

const cx = classNames.bind(css)

class Episodes extends Component {
  render() {
    return (
      <div className={cx('root')}>
        <ul className={cx('ul')}>{this.props.podcast.map(x =>
          <li key={x.url} className={cx('li')}>
            <a href={x.url} target="_blank">{x.title}</a>
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