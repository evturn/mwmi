import { combineReducers } from 'redux';
import blog from './blog';
import enquiry from './enquiry';

const user = (state = {}, action) => state;
const rootReducer = combineReducers({ blog, enquiry, user });

export default rootReducer;