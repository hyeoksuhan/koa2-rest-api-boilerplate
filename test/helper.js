const chai = require('chai');
chai.use(require('chai-http'));

const server = require('../app');
const request = chai.request(server);

const prefix = '/api/v1';

['post', 'put', 'get', 'delete', 'del'].forEach(method => {
  const origin = request[method];
  request[method] = function(path, body) {
    if (!path.startsWith(prefix)) {
      path = prefix + path;
    }

    const request = origin(path);

    if (body) {
      return request.send(body);
    }

    return request;
  };
});

chai.request.Request.prototype.then = function(resolve, reject) {
  const self = this;
  return new Promise((_resolve, _reject) => {
    self.end((err, res) => {
      if (err) {
        _reject(err);
      } else {
        _resolve(res);
      }
    });
  })
  .then(res => {
    const {body, status} = res;
    return {body, status};
  })
  .then(resolve)
  .catch(err => {
    const error = {
      status: err.response.status
    };
    const body = err.response.body;

    if (body) {
      error.code = body.error_code;
    }

    throw error;
  })
  .catch(reject);
};

chai.request.Request.prototype.catch = function(handler) {
  return this.then(undefined, handler);
};

exports.request = request;
exports.should = chai.should();
exports.fail = exports.should.fail;
exports.services = require('../app/services');
exports.models = require('../app/models');