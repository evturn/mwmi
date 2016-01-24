import React, {PropTypes} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Actions from '../actions';

class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className='site-content'>
        <Header links={this.props.navLinks} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  navLinks: PropTypes.array,
  section: PropTypes.string,
  user: PropTypes.object,
  dispatch: PropTypes.func
}


function mapStateToProps(state) {
  return {
    navLinks: state.site.navLinks,
    section: state.site.section,
    posts: state.blog.posts,
    post: state.post.post,
    categories: state.blog.categories,
    filters: state.blog.filters,
    user: state.site.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);