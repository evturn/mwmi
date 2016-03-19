import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'reducers';

let middleware = applyMiddleware(thunk);

if (__DEV__ && __CLIENT__) {
  middleware = compose(
    applyMiddleware(thunk, logger()),
    window.devToolsExtension()
  );
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middleware);
}