import { combineReducers } from 'redux';
import blog from './blog';
import enquiry from './enquiry';
import pagination from './pagination';

const rootReducer = combineReducers({ blog, enquiry, pagination });

export default rootReducer;