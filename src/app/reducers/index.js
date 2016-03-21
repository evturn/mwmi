import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import blog from './blog';
import enquiry from './enquiry';

const site = (state = {}, action) => state;
const rootReducer = combineReducers({
  blog,
  enquiry,
  site,
  routing: routerReducer
});

export default rootReducer;