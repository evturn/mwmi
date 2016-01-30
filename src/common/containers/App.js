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
  render() {
    return (
      <div className='site-content'>
        {this.state ? <Header navLinks={this.state.navLinks} /> : null }
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
  posts: PropTypes.object,
  categories: PropTypes.array,
  filters: PropTypes.object,
  post: PropTypes.object,
  category: PropTypes.object
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};


//