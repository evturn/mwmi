import React, {PropTypes} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import xhr from '../../client/xhr';

export default class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className='site-content'>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}