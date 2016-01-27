import { combineReducers } from 'redux';

import {
  REQUEST_INIT,
  REQUEST_ERROR,
  REQUEST_BLOG_SUCCESS,
  REQUEST_POST_SUCCESS,
  REQUEST_CATEGORY_SUCCESS
} from '../actions';

const initial = {
  // data
  posts: {},
  post: {},
  categories: [],
  category: {},
  //filters (post, category)
  filters: {},
  // site
  navLinks: [],
  section: '',
  user: {},
  completed: false,
  isFetching: false
};

const reducer = (state=initial, action) => {
  switch (action.type) {
    case REQUEST_INIT:
      return Object.assign(
        state, {
          filters: action.filters,
          isFetching: true,
          completed: false
      });
    case REQUEST_ERROR:
      return Object.assign(
        state, {
          message: action.message,
          isFetching: false,
          completed: false
      });
    case REQUEST_BLOG_SUCCESS:
      return Object.assign(
        state, {
          posts: action.payload.posts,
          categories: action.payload.categories,
          isFetching: false,
          completed: true
      });
    case REQUEST_CATEGORY_SUCCESS:
      return Object.assign(
        state, {
          posts: action.payload.posts,
          category: action.payload.category,
          isFetching: false,
          completed: true
      });
    case REQUEST_POST_SUCCESS:
      return Object.assign(
        state, {
          post: action.payload.post,
          isFetching: false
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({reducer});

export default rootReducer;