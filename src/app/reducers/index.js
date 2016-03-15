import { combineReducers } from 'redux';
import blog from './blog';
import enquiry from './enquiry';

const rootReducer = combineReducers({ blog, enquiry });

export default rootReducer;