import assessments from './assessments.json'

/**
 * The API module holds methods and information important to communicate with the API
 * and handle responses
 */
const ODAS = {};

ODAS.get = async (url, params = {}, optionOverrides = {}) => {
  return assessments;
};

export default ODAS;
