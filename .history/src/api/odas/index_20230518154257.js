import assessments from './assessments.json'
import user_assessments from './user_assessments.json'

/**
 * The API module holds methods and information important to communicate with the API
 * and handle responses
 */
const ODAS = {};

ODAS.get = async (url, params = {}, optionOverrides = {}) => {
  if(params.public) {
    return assessments;
  }
  else {
    return user_assessments;
  }
};

export default ODAS;
