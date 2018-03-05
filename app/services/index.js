const fs = require('fs');

module.exports = fs.readdirSync(__dirname)
  .filter(filename => filename !== 'index.js')
  .reduce((services, filename) => {
    const service = require(`./${filename}`);
    services[service.name] = service;
    return services;
  }, {});