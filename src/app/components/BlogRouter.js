import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterPosts } from 'actions/blog'

class BlogRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { dispatch, sort, params, query } = this.props;

    query = query ? query : { query: { page: 1 } };

    return (
      <span onClick={() => dispatch(filterPosts({ params, query, sort }))}>
        {this.props.children}
      </span>
    );
  }
}

BlogRouter.propTypes = {
  sort: PropTypes.object,
  params: PropTypes.object,
  query: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    sort: state.blog.sort
  };
};

export default connect(mapStateToProps)(BlogRouter);