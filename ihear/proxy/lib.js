// @ts-ignore
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const proxy = require('express-http-proxy');
const auth0 = require('auth0');

let cachedAccessToken;
let expiresAt = new Date(0);

async function getNonCachedAccessToken() {
  const authClient = new auth0.AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET
  });
  const response = await authClient.clientCredentialsGrant({
    audience: process.env.AUDIENCE
  });
  return response;
}

async function getAccessToken() {
  if (expiresAt.getTime() > Date.now()) {
    if (dev) {
      console.log('[Access token] using cache');
    }
    return cachedAccessToken;
  }

  const response = await getNonCachedAccessToken();
  let expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + response.expires_in);
  expiresAt = expiry;
  cachedAccessToken = response.access_token;
  if (dev) {
    console.log(`[Access token] Updated, expires at ${expiresAt}`);
  }
  return cachedAccessToken;
}

module.exports = proxy('api.clm.cloud', {
  https: true,
  proxyReqOptDecorator: async function(proxyReqOpts, srcReq) {
    const accessToken = await getAccessToken();
    proxyReqOpts.headers['Authorization'] = 'Bearer ' + accessToken;
    return proxyReqOpts;
  },
  proxyReqPathResolver: function(req) {
    var parts = req.url.split('?');
    var queryString = parts[1];
    return '/configurator/v1/configure?' + queryString;
  }
});
