import fetch from './fetch';
/**
 * function for calling `/products` over HTTP
 */
export default fetch.bind(null, '/configure', 'POST');
