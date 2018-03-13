const methods = require('methods');
const {Request} = require('superagent');

module.exports = (chai) => {
  function getUri(app, path, prefix) {
    let addr = app.address();
    if (!addr) {
      app.listen();
      addr = app.address();
    }

    // If address is "unroutable" IPv4/6 address, then set to localhost
    if (addr.address === '0.0.0.0' || addr.address === '::') {
      addr.address = 'localhost';
    }

    // Only provide http now
    return `http://${addr.address}:${addr.port}${prefix}${path}`;
  }

  class _Request extends Request {
    constructor(app, method, path, prefix) {
      super(method, path);

      this.url = getUri(app, path, prefix);
    }

    then(resolve, reject) {
      return new Promise((_resolve, _reject) => {
        this.end((err, res) => {
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
    }

    catch(errorHandler) {
      this.then(undefined, errorHandler);
    }
  }

  chai.request = function(app, prefix='') {
    const obj = {};

    methods.forEach(method => {
      obj[method] = function(path, body) {
        const request = new _Request(app, method, path, prefix);

        if (body) {
          return request.send(body);
        }

        return request;
      };
    });
    obj['del'] = obj.delete;

    return obj;
  };
};