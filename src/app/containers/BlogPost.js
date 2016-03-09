import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, unmountPost } from 'actions';
import Post from 'components/Post';

class BlogPost extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(fetchPost(params.slug));
  }
  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(unmountPost());
  }
  render() {
    const { hasOne, post } = this.props;

    return (
      <div className="post">
        <div className="post__header">
          <div className="post__header-back">
            <Link to={{ pathname: `/blog` }}><span className="fa fa-long-arrow-left" /> back to the blog</Link>
          </div>
        </div>
        {hasOne ? <Post {...post}/> : null}
      </div>
    );
  }
  renderPost() {
    return (
      <Post {...this.props.post}/>
    );
  }
}

BlogPost.propTypes = {
  post: PropTypes.object,
  hasOne: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    post: state.blog.post,
    hasOne: state.blog.hasOne
  };
}

export default connect(mapStateToProps)(BlogPost);