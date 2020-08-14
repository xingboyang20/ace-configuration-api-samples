// @ts-ignore
const proxy = require('express-http-proxy');

module.exports = proxy('daily.clm-dev.cloud', {
  https: true,
  proxyReqOptDecorator: async function (proxyReqOpts, srcReq) {
    console.log(process.env.API_KEY.length, process.env.API_KEY[0]);
    proxyReqOpts.headers['Authorization'] = 'ApiKey ' + process.env.API_KEY;
    return proxyReqOpts;
  },
  proxyReqPathResolver: function (req) {
    var parts = req.url.split('?');
    var queryString = parts[1];
    return '/configurator/v1/configure?' + queryString;
  },
});
