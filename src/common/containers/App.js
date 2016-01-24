import React, {PropTypes} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    console.log(this.props);
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
  navLinks: PropTypes.array,
  section: PropTypes.string,
  user: PropTypes.object
}


function mapStateToProps(state) {
  return {
    navLinks: state.site.navLinks,
    section: state.site.section,
    posts: state.blog.posts,
    categories: state.blog.categories,
    filters: state.blog.filters,
    user: state.site.user
  };
}

export default connect(mapStateToProps)(App);