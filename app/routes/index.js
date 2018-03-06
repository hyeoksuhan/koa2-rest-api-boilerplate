const services = require('../services');
const errors = require('../errors');

const v1 = require('./v1');

module.exports = {
  '/v1': v1(services, errors),
};