import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import blog from './blog';
import enquiry from './enquiry';

const user = (state = {}, action) => state;
const rootReducer = combineReducers({
  blog,
  enquiry,
  user,
  routing: routerReducer
});

export default rootReducer;