const chai = require('chai');
chai.use(require('chai-http'));

const server = require('../app');
const request = chai.request(server);

const prefix = '/api/v1';

// TODO: need to change as chanable of origin
['post', 'put', 'get', 'delete', 'del'].forEach(method => {
  const origin = request[method];
  request[method] = function(path, body) {
    if (!path.startsWith(prefix)) {
      path = prefix + path;
    }

    return origin(path).send(body)
      .then(res => {
        const {body, status} = res;
        return {body, status};
      })
      .catch(e => {
        const error = {
          status: e.response.status
        };

        const body = e.response.body;
        if (body) {
          error.code = body.error_code;
        }

        throw error;
      });
  };
});

exports.request = request;
exports.should = chai.should();
exports.fail = exports.should.fail;
exports.services = require('../app/services');
exports.models = require('../app/models');