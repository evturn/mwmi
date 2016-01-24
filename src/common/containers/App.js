import React from 'react';
import Header from '../components/Header';


export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = window.__INITIAL_STATE__;
  }
  render() {
    return (
      <div className='site-content'>
        <Header links={this.state.navLinks}/>
        {this.props.children}
      </div>
    );
  }
}