import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import css from 'less/components/blog.less';

const cx = classNames.bind(css);

class Blog extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className={cx('blog')}>
        {this.props.children}
      </div>
    );
  }
}

Blog.propTypes = {
  sort: PropTypes.object,
  showing: PropTypes.array,
  posts: PropTypes.array,
  categories: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  state => ({
    sort: state.blog.sort,
    showing: state.blog.showing,
    posts: state.blog.posts,
    categories: state.blog.categories
  })
)(Blog)