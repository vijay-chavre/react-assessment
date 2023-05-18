import API from '../index';
import hash from 'object-hash';
import assessments from './assessments.json'

/**
 * The API module holds methods and information important to communicate with the API
 * and handle responses
 */
const ODAS = {};

/**
 * Makes a GET request and returns the error promise, or the response as JSON
 *
 * @param {string} url URL to make the request to, apended to baseUrl
 * @param {object} params query parameters to append to the request
 * @param {object} optionOverrides additional configuration for Fetch, only for this request
 * @returns A json response | or an error promise
 */
ODAS.get = async (url, params = {}, optionOverrides = {}) => {
  return assessments;
};


export default ODAS;
