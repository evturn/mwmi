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

export default connect(
  (state, ownProps) => ({
    category: ownProps.params.category,
    author: ownProps.params.author,
    post: ownProps.params.post,
    page: ownProps.location.query.page,
  })
)(App);