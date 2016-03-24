import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import blog from './blog';
import enquiry from './enquiry';
import gallery from './gallery';

const site = (state = {}, action) => state;
const rootReducer = combineReducers({
  blog,
  enquiry,
  site,
  gallery,
  routing: routerReducer
});

export default rootReducer;