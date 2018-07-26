import reducer from './asteroids';
import constant from '../constants/asteroids';

describe('Testing asteroids reducer', () => {
  it('Should return the initial state', () => {
    const obReceived = reducer(undefined, {});
    const obExpected = {
      element_count: 0,
      error: null,
      error_message: null,
      links: null,
      loading: null,
      near_earth_objects: null,
    };

    expect(obReceived).toEqual(obExpected);
  });

  it('Should handle get asteroids works', () => {
    const obReceived = reducer(
      {
        element_count: 0,
        error: null,
        error_message: null,
        links: null,
        loading: null,
        near_earth_objects: null,
      },
      {
        type: constant.get,
      }
    );
    const obExpected = {
      element_count: 0,
      error: null,
      error_message: null,
      links: null,
      loading: true,
      near_earth_objects: null,
    };

    expect(obReceived).toEqual(obExpected);
  });

  it('Should handle get asteroids works', () => {
    const obReceived = reducer(
      {
        element_count: 0,
        error: null,
        error_message: null,
        links: null,
        loading: true,
        near_earth_objects: null,
      },
      {
        type: constant.set,
        data: {
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
        },
      }
    );
    const obExpected = {
      element_count: 1,
      error: null,
      error_message: null,
      links: {
        next: 'next_link',
        prev: 'prev_link',
        self: 'self_link',
      },
      loading: false,
      near_earth_objects: {
        'YYYY-MM-DD': [
          {
            name: '(2015 RC)',
            neo_reference_id: '3726710',
          },
        ],
      },
    };

    expect(obReceived).toEqual(obExpected);
  });
});
