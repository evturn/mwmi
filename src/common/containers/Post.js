import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Actions from '../actions';

class Post extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className="container blog-detail">
        <div className="wrapper">
          <p className="navigate-link"><a href="/blog"><i className="fa fa-long-arrow-left"></i> back to the blog</a></p>
          <div className="entry">
            <div className="title-container">
              <h1 className="text-header">TITLE</h1>
              <h5 className="meta">AUTHOR NAME</h5>
            </div>
            <div className="body-container">CONTENT</div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  filters: PropTypes.object,
  post: PropTypes.object,
  category: PropTypes.object,
  dispatch: PropTypes.func
}


function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
    filters: state.filters,
    post: state.post,
    category: state.category
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);