import fetch from './fetch';
/**
 * function for calling `/price` over HTTP
 */
export default fetch.bind(null, '/price', 'POST');
