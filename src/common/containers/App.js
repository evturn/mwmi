import React, {PropTypes} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import xhr from '../../client/xhr';

export default class App extends React.Component {
  constructor(props){
    super(props);

  }
  componentDidMount() {
    xhr('/api/locals')
      .then(res => res.json())
      .then(json => this.setState(json))
      .catch(err => console.log(err));
  }
  componentWillReceiveProps(nextProps) {
    let page = nextProps.location.pathname.substr(1, 4)
    if (page === '') {
      page = 'home'
    }
    this.setState({
      section: page
    });
  }
  render() {
    return (
      <div className='site-content'>
        {this.state ? <Header section={this.state.section} navLinks={this.state.navLinks} /> : null }
        {this.props.children}
        <Footer />
      </div>
    );
  }
}