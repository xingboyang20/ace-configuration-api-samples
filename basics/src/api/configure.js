import fetch from './fetch';
/**
 * function for calling `products` over http
 */
export default fetch.bind(null, '/configure', 'POST');
