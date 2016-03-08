import { combineReducers } from 'redux';

function blog(state = {
  post: {},
  posts: [],
  categories: [],
  category: {},
  pagination: {
    pages: [],
    currentPage: 1,
    first: 1,
    last: 1,
    next: false,
    previous: false,
    total: 0,
    totalPages: 0
  },
  isFetching: false,
  isCompleted: false
}, action) {
  switch (action.type) {
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
        isCompleted: false
      });
    case 'RECEIVE_POSTS':
      const {
        posts, post,
        categories, category } = action.payload;

      return Object.assign({}, state, {
        isFetching: false,
        isCompleted: true,
        posts: posts.results,
        post: post,
        categories: categories,
        category: category || null,
        pagination: {
          pages: posts.pages,
          currentPage: posts.currentPage,
          first: posts.first,
          last: posts.last,
          next: posts.next,
          previous: posts.previous,
          total: posts.total,
          totalPages: posts.totalPages
        }
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({blog})

export default rootReducer