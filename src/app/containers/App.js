import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='site'>
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array,
  post: PropTypes.object,
  categories: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    post: state.blog.post,
    categories: state.blog.categories
  };
};

export default connect(mapStateToProps)(App);