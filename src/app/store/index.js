import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'reducers';

const middleware = !window.__DEV__ ?  applyMiddleware(thunk) : applyMiddleware(thunk, logger());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}