import React, {PropTypes} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    console.log(this);
    return (
      <div className='site-content'>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  posts: PropTypes.array,
  categories: PropTypes.array
}


function mapStateToProps(state) {
  return {
    posts: state.blog.posts,
    categories: state.blog.categories
  };
}

export default connect(mapStateToProps)(App);