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
      <div className='site-container'>
        <Header />
        <div className='site-content'>
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
  category: PropTypes.object,
  pagination: PropTypes.object,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    post: state.blog.post,
    categories: state.blog.categories,
    category: state.blog.category,
    pagination: state.blog.pagination,
    isFetching: state.blog.isFetching,
    isCompleted: state.blog.isCompleted
  };
};

export default connect(mapStateToProps)(App);