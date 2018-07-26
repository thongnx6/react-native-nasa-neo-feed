/**
 * index.js
 *
 * Agent API makes writing JSON requests with fetch easier
 */

import { config as apiConfig } from './config';

defaults = (target, obj) => {
  for (var prop in obj) target[prop] = target[prop] || obj[prop];
};

getQuery = queryParams => {
  var arr = Object.keys(queryParams).map(function(k) {
    return k + '=' + queryParams[k]; // if encodeURI is necessary, please use encodeURIComponent(queryParams[k]) instead;
  });
  return '?' + arr.join('&');
};

handleResponseCatch = e => {
  if (e.response && e.response.json()) {
    e.response.json().then(json => {
      if (json) throw json;
      throw e;
    });
  } else {
    throw e;
  }
};

_fetch = (method, url, opts, data, queryParams) => {
  opts.method = method;
  opts.headers = opts.headers || {};
  opts.responseAs =
    opts.responseAs && ['json', 'text', 'response'].indexOf(opts.responseAs) >= 0
      ? opts.responseAs
      : 'json';

  defaults(opts.headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  if (queryParams) {
    url += getQuery(queryParams);
  }

  if (data) {
    opts.body = JSON.stringify(data);
  } else {
    delete opts.body;
  }

  console.info(`FETCH ${url} with`, opts);
  return fetch(url, opts).then(response => {
    return response[opts.responseAs]();
  });
};

fetchAg = (url, opts) => {
  opts = opts || {};

  var _ = function(urlExtends, optExtends) {
    // Extend parameters with previous ones
    urlExtends = url + '/' + urlExtends;
    optExtends = optExtends || {};
    defaults(optExtends, opts);
    return fetchAg(urlExtends, optExtends);
  };

  _.get = function(queryParams) {
    return _fetch('GET', url, opts, null, queryParams);
  };

  _.post = function(data) {
    return _fetch('POST', url, opts, data);
  };

  _.put = function(data) {
    return _fetch('PUT', url, opts, data);
  };

  _.patch = function(data) {
    return _fetch('PATCH', url, opts, data);
  };

  _.delete = function() {
    return _fetch('DELETE', url, opts);
  };

  return _;
};

/**
 * Make a API call to server. This is the agent fetch with RESTful API.
 * Except the path, all arguments to this function are optional.
 *
 * @param endPoint   {String}   the url path
 * @param method     {String}   the http method
 * @param payload    {Object}   the parameters for the query
 * @param header     {Function} the callback function to handle the response
 */
export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
  return fetchAg(`${apiConfig.url}${endPoint}`, {
    headers: {
      // use Bearer Authorization for init accessToken if APi required that
      // ex  Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  })
    [method.toLowerCase()]({ ...payload, api_key: apiConfig.apiKey })
    .catch(e => {
      handleResponseCatch(e);
    });
};
