import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const initialState = {
  user: {},
  nav: [],
  loading: false,
  episodes: [],
  enquiry: {
    hasErrors: false,
    enquirySubmitted: false,
    validationErrors: {},
    formData: {}
  }
}

const app = (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_INITIAL_STATE':
      return Object.assign({}, state, {
        loading: true
      })

    case 'FETCH_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        ...action.payload
      })

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
