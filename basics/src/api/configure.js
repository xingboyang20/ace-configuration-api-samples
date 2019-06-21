import fetch from './fetch';
/**
 * function for calling `/configure` over HTTP
 */
export default fetch.bind(null, '/configure', 'POST');
