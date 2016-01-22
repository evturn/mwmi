// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Blog from '../components/Blog';
// import * as TodoActions from '../actions/todos';

function mapStateToProps(state) {
  return {
    blogPosts: state.todos.present
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   };
// }

// mapDispatchToProps <- 2nd arg
export default connect(mapStateToProps)(Blog);
