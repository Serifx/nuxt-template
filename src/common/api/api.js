import * as request from '../utils/request';

export const API_HOST = location.origin;

request.config({
  baseURL: API_HOST
});

export default {
  account: {
    login: (data, config) => request.send('get', `/api/account/login`, { data }, config),
  }
};
