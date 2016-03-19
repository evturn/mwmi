import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost } from 'actions/blog';
import Post from 'components/Post';
import classNames from 'classnames/bind';
import css from 'less/components/post.less';

const cx = classNames.bind(css);

class BlogPost extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(fetchPost(params.post));
  }
  render() {
    const { hasOne, post} = this.props;

    return (
      <div className={cx('post-detail')}>
        <div className={cx('post-detail__header')}>
          <div className={cx('post-detail__back')}>
            <Link to={{ pathname: `/blog` }}><span className={cx('fa fa-long-arrow-left')} /> back to the blog</Link>
          </div>
        </div>
        {hasOne ? <Post {...post}/> : null}
      </div>
    );
  }
}

BlogPost.propTypes = {
  post: PropTypes.object,
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(
  state => ({
    post: state.blog.post,
    hasOne: state.blog.hasOne
  })
)(BlogPost);