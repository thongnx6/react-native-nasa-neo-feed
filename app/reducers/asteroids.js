/**
 * Reducer stays pue, never do inside a reducer:
 * - mutate its arguments
 * - perform side effects like API calls and routing transitions
 * - call none-pure function , e.g. : Date.now(), Math.random, Buffer(),...
 */

import constant from '../constants/asteroids';

const initialState = {
  links: null,
  element_count: 0,
  near_earth_objects: null,
  error_message: null,
  error: null,
  loading: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case constant.get:
      return Object.assign({}, state, {
        loading: true,
        error_message: null,
      });
    case constant.set:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        error_message: null,
        ...action.data,
      });

    case constant.error:
      return Object.assign({}, state, {
        loading: false,
        error_message: null,
        error: action.error,
      });

    default:
      return state;
  }
};
