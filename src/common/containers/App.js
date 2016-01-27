import React, {PropTypes} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Actions from '../actions';

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
  category: PropTypes.object,
  isFetching: PropTypes.bool,
  completed: PropTypes.bool,
  dispatch: PropTypes.func
}


function mapStateToProps(state) {
  return {
    navLinks: state.reducer.navLinks,
    user: state.reducer.user,
    section: state.reducer.section,
    posts: state.reducer.posts,
    categories: state.reducer.categories,
    filters: state.reducer.filters,
    post: state.reducer.post,
    category: state.reducer.category,
    isFetching: state.reducer.isFetching,
    completed: state.reducer.completed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);