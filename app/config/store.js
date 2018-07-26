/**
 * Configuring store
 *
 * Improved readability and convenience are the main advantages of using *compose*.
 * All compose does is let you write deeply nested function transformations without the rightward drift of the code.
 * Don’t give it too much credit!
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers/index';

const middleware = [];

// using logger with development mode
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default (state = {}) =>
  createStore(reducers, state, compose(applyMiddleware(thunk, ...middleware)));
