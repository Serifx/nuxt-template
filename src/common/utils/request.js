import axios from 'axios';
import tip from '../com/tip';
import qs from 'qs';

axios.defaults.timeout = 3e4;
// instance.defaults.headers.common['token'] = 'www.eb56.com';

// Interceptors
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  // console.log('Request start');

  if (['put', 'post', 'patch'].indexOf(config.method.toLowerCase()) >= 0) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (config.data) {
      config.data = qs.stringify(config.data);
    }
  }

  return config;
}, error => {
  return Promise.reject(error);
});
// instance.interceptors.response.use((response) => {
//   // Do something with response data
//
//   console.log('Request end: %o', response);
//   return response;
// }, (error) => {
//   return Promise.reject(error);
// });

export function config (config) {
  Object.assign(axios.defaults, config);
}

export function send (method, url, options = {}, { showLoading = true } = {}) {
  if (showLoading) {
    tip.loading();
  }

  const returnData = {
    statusCode: null,
    statusText: null,
    code: null,
    data: null,
    msg: null
  };

  if (method.toLowerCase() === 'get') {
    options.params = options.params || {};
    Object.assign(options.params, options.data);
  }

  console.log('Request info: %o', {
    localUrl: location.href,
    requestUrl: url,
    requestParams: options,
  });
  return new Promise((resolve, reject) => {
    const req = axios({url, method, ...options});
    req
      .then(res => {
        // console.log(res);

        Object.assign(returnData, res.data);
        returnData.statusCode = res.status;
        returnData.statusText = res.statusText;

        if (res.data && res.data.code === 1000) {
          return resolve(returnData);
        }

        // 除了正确返回代码， 其他均为错误
        return reject(returnData);
      })
      .catch((res) => {
        console.warn(res);

        returnData.statusCode = res.status;
        returnData.statusText = res.statusText;
        returnData.code = null;
        returnData.data = res;
        returnData.msg = res.message || res.msg;

        return reject(returnData);
      })
      .finally(() => {
        console.log('Response data: %o', returnData);
        tip.hideLoading();
      });

    // return req;
  })
    .catch((res) => {
      console.warn(res);
      throw res;
    });
}

export default send;
