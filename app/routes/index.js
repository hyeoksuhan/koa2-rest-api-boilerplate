const services = require('../services');

module.exports = {
  '/v1': require('./v1')(services),
};