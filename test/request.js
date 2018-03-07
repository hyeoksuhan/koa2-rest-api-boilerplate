const chai = require('chai');
chai.use(require('chai-http'));

const server = require('../app');

exports = module.exports = chai.request(server);