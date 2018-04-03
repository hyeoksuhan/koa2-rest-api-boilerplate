const fs = require('fs');

function getModule(filename, router) {
  let module = require('./' + filename);
  if (typeof module === 'function') {
    module = module(router.authCheck);
  }
  return module;
}

module.exports = (router) =>
  fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .map(file => getModule(file, router))
    .forEach(routes => {
      Object.keys(routes).forEach(path => {
        const route = routes[path];
        Object.keys(route).forEach(method => {
          let handler = route[method];

          if (Array.isArray(handler)) {
            handler.unshift(path);
          } else {
            handler = [path, handler];
          }

          router[method](...handler);
        });
      });
    });