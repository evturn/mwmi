import React, { Component, PropTypes } from 'react'
import Post from 'components/Post'
import classNames from 'classnames/bind'
import css from 'less/components/blog.less'

const cx = classNames.bind(css)

class Posts extends Component {
  render() {
    const { posts } = this.props

    return (
      <div className={cx('posts')}>{posts.map((item, i) =>
        <Post key={i} {...item} />
      )}</div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts