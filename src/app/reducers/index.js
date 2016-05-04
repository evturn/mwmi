import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const app = (state = {
  user: {},
  nav: [],
  episodes: [],
  enquiry: {
    hasErrors: false,
    enquirySubmitted: false,
    validationErrors: {},
    formData: {}
  }
}, action) => {
  switch (action.type) {
    case 'ENQUIRY_SUCCESS':
      return Object.assign({}, state, {
        enquiry: {
          ...state.enquiry,
          ...action.payload
        }
      })
    case 'ENQUIRY_SNAPSHOT':
      return Object.assign({}, state, {
        enquiry: {
          ...state.enquiry,
          ...action.payload
        }
      })
    case 'ENQUIRY_ERROR':
      return Object.assign({}, state, {
        enquiry: {
          ...state.enquiry,
          ...action.payload
        }
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app,
  routing: routerReducer
})

export default rootReducer