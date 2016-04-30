import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import podcast from './podcast'
import enquiry from './enquiry'
import gallery from './gallery'

const site = (state = {}, action) => state
const rootReducer = combineReducers({
  podcast,
  enquiry,
  site,
  gallery,
  routing: routerReducer
})

export default rootReducer