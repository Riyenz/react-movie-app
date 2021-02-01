import axios from 'axios';

import config from '../config';

const http = (options = {}) => {
  const defaultOptions = {
    baseURL: config.apis.DEFAULT,
    headers: {},
  };

  const opts = Object.assign({}, defaultOptions, options);

  let http = axios.create(opts);

  http.interceptors.response.use((response) => response.data);

  return http;
};

export default http;
