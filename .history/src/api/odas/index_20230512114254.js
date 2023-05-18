import API from '../index';
import hash from 'object-hash';
import Language from '@/utils/Language';

/**
 * The API module holds methods and information important to communicate with the API
 * and handle responses
 */
const ODAS = {};

const pendingRequests = {}

/**
 * Makes a GET request and returns the error promise, or the response as JSON
 *
 * @param {string} url URL to make the request to, apended to baseUrl
 * @param {object} params query parameters to append to the request
 * @param {object} optionOverrides additional configuration for Fetch, only for this request
 * @returns A json response | or an error promise
 */
ODAS.get = async (url, params = {}, optionOverrides = {}) => {
  // digest the request into a unique string
  const requestHash = url + hash(params) + hash(optionOverrides) + 'en';
  const options = optionOverrides;
  // check if there is a pending request for this exact request, if so, return that
  if(typeof pendingRequests[requestHash] !== 'undefined') {
    return await pendingRequests[requestHash];
  } else { 
    // otherwise, make a fresh request and track it in the pending request object until it completes
    pendingRequests[requestHash] = API.get(url, params, options).then((response) => {
      delete pendingRequests[requestHash];
      return response;
    });
    return await pendingRequests[requestHash];
  }
};

/**
 * Makes a POST request and returns the error promise, or the response as JSON
 *
 * @param {string} url URL to make the request to, apended to baseUrl
 * @param {object} data Body of the request
 * @param {object} data additional query parametrs to append
 * @param {object} optionOverrides additional configuration for Fetch, only for this request
 * @returns A json response | or an error promise
 */
ODAS.post = async (url, data, params, optionOverrides = {}) => {
  return await API.post(url, data, params, optionOverrides);
};

/**
 * Makes a PUT request and returns the error promise, or the response as JSON
 *
 * @param {string} url URL to make the request to, apended to baseUrl
 * @param {object} data Body of the request
 * @param {object} params additional query parameters to append
 * @param {object} optionOverrides additional configuration for Fetch, only for this request
 * @returns A json response | or an error promise
 */
ODAS.put = async (url, data, params, optionOverrides = {}) => {
  return await API.put(url, data, params, optionOverrides);
};

/**
 * Makes a DELETE request and returns the error promise, or the response as JSON
 *
 * @param {string} url URL to make the request to, apended to baseUrl
 * @param {object} optionOverrides additional configuration for Fetch, only for this request
 * @returns A json response | or an error promise
 */
ODAS.delete = async (url, params = {}, optionOverrides = {}) => {
  const options = optionOverrides;
  return await API.delete(url, null, params, options);
};


export default ODAS;
