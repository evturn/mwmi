import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import css from 'less/components/episodes.less'

const cx = classNames.bind(css)

class Episodes extends Component {
  render() {
    const a = [
      'Episode 1: Fred Goes to School',
      'Episode 2: I Eat Sandwiches',
      'Episode 3: This Tastes Like Shit. Here, Try It',
      'Episode 4: Nobody Knows How To Swim',
      'Episode 5: I Decorated a Cake',
      'Episode 6: Do Not Ask About The Specials'
    ]

    return (
      <div>
        <ul className={cx('ul')}>{this.props.episodes.map(x =>
          <li key={x.slug} className={cx('li')}>{x.title}</li>
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
  (state) => ({
    episodes: state.blog.showing
  })
)(Episodes);