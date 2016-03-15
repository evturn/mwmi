import { combineReducers } from 'redux';
import blog from './blog';
import pagination from './pagination';
import enquiry from './enquiry';

const rootReducer = combineReducers({ blog, enquiry, pagination });

export default rootReducer;