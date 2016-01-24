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
  children: PropTypes.object,
  post: PropTypes.object,
  section: PropTypes.string,
  user: PropTypes.object
}


function mapStateToProps(state) {
  return {
    section: state.site.section,
    post: state.post.post,
    user: state.site.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);