import { fetchApi } from './index';

const endPoints = {
  get: '/feed',
};

export const get = payload => fetchApi(endPoints.get, payload, 'get');
