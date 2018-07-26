// asteroids
//
// Action creators can also be asynchronous and have side-effects, handle API responses and compose action creators into async control flow.

import constants from '../constants/asteroids';
import * as asteroidsApi from '../../api/asteroids';

const asteroids = {
  get() {
    return {
      type: constants.get,
    };
  },

  set(data) {
    return {
      data,
      type: constants.set,
    };
  },

  error(data) {
    return {
      error: data,
      type: constants.error,
    };
  },
};

const callbacks = {
  error(data, dispatch) {
    dispatch(asteroids.error(data));
  },

  get(dispatch) {
    dispatch(asteroids.get());
  },

  success(data, dispatch) {
    dispatch(asteroids.set(data));
  },
};

export default {
  get(queryParams) {
    return dispatch => {
      callbacks.get(dispatch);

      return asteroidsApi
        .get(queryParams)
        .then(data => callbacks.success(data, dispatch))
        .catch(data => callbacks.error(data, dispatch));
    };
  },
};
