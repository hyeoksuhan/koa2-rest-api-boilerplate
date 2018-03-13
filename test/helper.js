const chai = require('chai');
chai.use(require('./request'));

const server = require('../app');

exports.request = chai.request(server, '/api/v1');
exports.should = chai.should();
exports.fail = exports.should.fail;
exports.services = require('../app/services');
exports.models = require('../app/models');