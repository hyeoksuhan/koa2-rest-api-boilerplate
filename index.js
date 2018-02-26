require('babel-polyfill');
require('babel-register')({
	ignore: /node_modules\/(?!koa)/
});

var config = require('config');
var app = require('./app')({
  jwtsecret: config.jwtsecret,
  prefix: '/api'
});
app.listen(process.env.PORT || 3000);
