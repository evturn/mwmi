import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import classNames from 'classnames/bind';
import css from 'less/components/layout.less';

const cx = classNames.bind(css);

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className={cx('site')}>
        <Header />
        <div className={cx('content')}>
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