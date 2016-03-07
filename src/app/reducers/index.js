import { combineReducers } from 'redux';

function blog(state = {
  isFetching: false,
  isCompleted: false,
  posts: {},
  post: {},
  results: [],
  categories: [],
  category: null
}, action) {
  switch (action.type) {
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
        isCompleted: false
      });
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        isCompleted: true,
        posts: action.posts,
        results: action.results,
        categories: action.categories,
        category: action.category,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({blog})

export default rootReducer