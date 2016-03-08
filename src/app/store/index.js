import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'reducers';

const middleware = typeof window === 'object' ? applyMiddleware(thunk, logger()) : applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}