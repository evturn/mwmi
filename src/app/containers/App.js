import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'css/style.css';

export default class App extends Component {
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