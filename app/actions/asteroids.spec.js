import 'react-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import Moment from 'moment';
import { config as apiConfig } from '../../api/config';
import asteroidAction from './asteroids';
import constant from '../constants/asteroids';
import { format } from 'path';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing Action and Action Creator', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Creates asteroidAction:get success when fetching Asteroids has been done', () => {
    const startDate = Moment().format('YYYY-MM-DD');
    const endDate = Moment().format('YYYY-MM-DD');
    const data = {
      element_count: 1,
      links: {
        next: 'next_link',
        prev: 'prev_link',
        self: 'self_link',
      },
      near_earth_objects: {
        'YYYY-MM-DD': [
          {
            neo_reference_id: '3726710',
            name: '(2015 RC)',
          },
        ],
      },
    };
    const expectedActions = [
      { type: constant.get },
      {
        type: constant.set,
        data: data,
      },
    ];
    const store = mockStore({ todos: [] });

    fetchMock.get(
      `${apiConfig.url}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${
        apiConfig.apiKey
      }`,
      data
    );

    return store
      .dispatch(asteroidAction.get({ start_date: startDate, end_date: endDate }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Creates asteroidAction:get error when fetching Asteroids has been done but return error_message with invalid filter', () => {
    const startDate = Moment().format('YYYY-MM-DD');
    const endDate = Moment()
      .add(8, 'days')
      .format('YYYY-MM-DD');
    const data = {
      code: 400,
      http_error: 'BAD_REQUEST',
      error_message:
        'Date Format Exception - Expected format (yyyy-mm-dd) - The Feed date limit is only 7 Days',
      request: 'req_link',
    };
    const expectedActions = [
      { type: constant.get },
      {
        type: constant.set,
        data: data,
      },
    ];
    const store = mockStore({ todos: [] });

    fetchMock.get(
      `${apiConfig.url}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${
        apiConfig.apiKey
      }`,
      data
    );

    return store
      .dispatch(asteroidAction.get({ start_date: startDate, end_date: endDate }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
