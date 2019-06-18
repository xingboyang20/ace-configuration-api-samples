// @ts-ignore
const proxy = require('../proxy/lib');

module.exports = function(app) {
  app.use('/proxy/configure', proxy);
};
