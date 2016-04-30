import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import episode from './episode'
import enquiry from './enquiry'
import gallery from './gallery'

const site = (state = {}, action) => state;
const rootReducer = combineReducers({
  episode,
  enquiry,
  site,
  gallery,
  routing: routerReducer
})

export default rootReducer