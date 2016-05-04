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
    case 'ENQUIRY_RECEIVED':
      return Object.assign({}, state, {
        enquiry: {
          ...state.enquiry,
          ...action.payload
        }
      })
    case 'UPDATE_FORM_DATA':
      return Object.assign({}, state, {
        enquiry: {
          ...state.enquiry,
          ...action.payload
        }
      })
    case 'VALIDATION_ERRORS':
      return Object.assign({}, state, {
        enquiry: {
          ...state.enquiry,
          ...action.payload
        }
      })
    case 'VALIDATE_FIELD':
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