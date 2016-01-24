import React, {PropTypes} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className='site-content'>
        <Header links={this.props.navLinks} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  posts: PropTypes.array,
  categories: PropTypes.array,
  navLinks: PropTypes.array,
  section: PropTypes.string,
  user: PropTypes.object
}


function mapStateToProps(state) {
  return {
    user: state.site.user,
    navLinks: state.site.navLinks,
    section: state.site.section,
    posts: state.blog.posts,
    categories: state.blog.categories
  };
}

export default connect(mapStateToProps)(App);