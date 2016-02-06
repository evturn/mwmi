import { combineReducers } from 'redux'
import {
  // SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_POSTS, RECEIVE_POSTS
} from './actions'

// function selectedCategory(state, action) {
//   switch (action.type) {
//     case SELECT_CATEGORY:
//       return action.category
//     default:
//       return state
//   }
// }

function blog(state = {
  isFetching: false,
  isCompleted: false,
  posts: {},
  categories: [],
  category: null
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        isCompleted: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        isCompleted: true,
        posts: action.posts,
        categories: action.categories,
        category: action.category,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({blog})

export default rootReducer