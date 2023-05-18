// import { getCookie, setCookie } from '@/utils/cookies';
import axios from 'axios';
// import Auth from '@/utils/api/odas/auth'
// import Keys from '@/constants/Keys';

/**
 * Initializes an axios client that we can use to have default configurations
 * Like access tokens, basic auth, etc
 * @param {object} overrides optionally provide interceptors or change configurations
 * @returns {object} instance axios client instance
 */

const client = (overrides) => {
  function perform({ method, url, params, options, data }) {
    const instance = axios.create();

    // Intercept eveery request, to includde tokens and other sensitive defaults
    instance.interceptors.request.use((config) => {

      const baseURL = process.env.PUBLIC_URL || 'http://localhost:3000';
      const HTTP_BASIC_USERNAME = process.env.HTTP_BASIC_USERNAME;
      const HTTP_BASIC_PASSWORD = process.env.HTTP_BASIC_PASSWORD;
      let basicAuth = '';
      // let authHeader = 'Authorization';

      if (HTTP_BASIC_PASSWORD && HTTP_BASIC_USERNAME) {
        basicAuth = 'Basic ' + Buffer.from(`${HTTP_BASIC_USERNAME}:${HTTP_BASIC_PASSWORD}`).toString('base64');
      }

      const newConfig = {
        ...config,
        baseURL,
        url,
        mode: 'cors',
        method,
        params,
        data,
        crossDomain: true,
        credentials: 'same-origin', // include, *same-origin, omit
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        ...options,
        headers: {
          "OneDegreeSource": 'one-degree',
          Authorization: basicAuth,
          // accept: 'application/json',
          'x-requested-with': 'XMLHttpRequest',
          ...(config?.headers),
          ...(options?.headers),
        },
      };

      // const CSRF_TOKEN = getCookie('CSRF-TOKEN');
      // if (CSRF_TOKEN) {
      //   newConfig.headers['Csrf-Token'] = CSRF_TOKEN;
      // }

      // const JWT_Token = getCookie('jwt_token');
      // if (JWT_Token) {
      //   newConfig.headers[authHeader] = `Bearer ${JWT_Token}`;
      // }

      return newConfig;
    }, (error) => {
      // Do something with request error
      return Promise.reject(error);
    });

    instance.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Axios already returns parsed JSON response
      const CSRF_TOKEN = response.headers['Csrf-Token'];

      // if (CSRF_TOKEN) {
      //   setCookie('CSRF-TOKEN', CSRF_TOKEN);
      // }

      return response;
    }, (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      //@TODO: 403 means the user might be unauthorized, or needs to reeenter password,  it can be intercepted here
      //   console.warn('Token expired, rejecting promise', { error });
      //   open the Confirm Password modal
      // }
      // error.response.data.status // the status code
      if(error.response.data.message == "Token expired") { // 403
        // Auth.verifyToken();
        // Auth.expireSession();
      }
      // note: would be better to pre-emptively load the confirm modal using react idle timer
      return Promise.reject(error);
    });

    return instance.request(url);
  };

  return {
    // create a new Axios instance that merges default config with oveerrides
    request: function (url, config) {
      // const instance = init();
      // return instance(url, config);
    },
    get: (url, params, options) => {
      return perform({ url, params, options, method: 'GET' });
    },
    post: (url, params, data, options) => {
      return perform({ url, params, data, options, method: 'POST' });
    },
    put: (url, params, data, options) => {
      return perform({ url, params, data, options, method: 'PUT' });
    },
    delete: (url, params, data, options) => {
      return perform({ url, params, data, options, method: 'DELETE' });
    },
    put: (url, params, data, options) => {
      return perform({ url, params, data, options, method: 'PUT' });
    },
    changeDefaultConfig: function () {

    }
  };
};

/**
 * Performs a GET request and returns a promise, or it can be used with the async/await keywords
 *
 * @param {string} url
 * @param {*} params
 * @param {*} options
 * @returns
 */
const get = async (url, params, options) => {
  return client().get(
    url,
    Object.assign(params, { api_key: options?.api_key, locale: 'en' }),
    options,
  ).then((data) => {
    data.response = data.data;
    return data;
  }).catch((err) => {
    console.log(err)
    return err;
  });
};

/**
 * Performs a POST request and returns a promise, or it can be used with the async/await keywords
 *
 * @param {string} url
 * @param {*} data body of the post requests
 * @param {*} options
 * @param {string} options.api_key
 * @returns
 */
const post = async (url, data, params = {}, options) => {
  return client().post(
    url,
    Object.assign(params, { api_key: options?.api_key, locale: 'en' }),
    data,
    options,
  ).then((data) => {
    data.response = data.data;
    return data;
  }).catch((error) => {
    console.warn('API.post', { error });
    return error;
  });
};

/**
 * Performs a PUT request and returns a promise, or it can be used with the async/await keywords
 *
 * @param {string} url
 * @param {*} data body of the put request
 * @param {*} options
 * @param {string} options.api_key
 * @returns
 */
const put = async (url, data, params = {}, options) => {
  return client().put(
    url,
    Object.assign(params, { api_key: options?.api_key, locale: 'en' }),
    data,
    options,
  ).then((data) => {
    console.log('API.put', { data });
    data.response = data.data;
    return data;
  }).catch((error) => {
    console.warn('API.put', { error });
    return error;
  });
};

/**
 * Performs a DELETE request and returns a promise, or it can be used with the async/await keywords
 *
 * @param {string} url
 * @param {*} data
 * @param {*} options
 * @returns
 */
const deleteFn = async (url, data, params, options) => {
  return client().delete(
    url,
    data,
    Object.assign(params, { api_key: options?.api_key, locale: 'en' }),
    options,
  );
};

const API = {
  get,
  post,
  put,
  delete: deleteFn,
};

export default API;
