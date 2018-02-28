require('babel-polyfill');
require('babel-register')({
	ignore: /node_modules\/(?!koa)/
});

const RedisStore = require('koa-session-redis-store');
const config = require('config');

const app = require('./app')({
  jwtsecret: config.jwtsecret,
  prefix: '/api',
  cookieSignKeys: ['secret', 'keys'],
  sessions: {
    store: new RedisStore(),
    rolling: false,
    maxAge: 60 * 1000,
  }
});

app.listen(process.env.PORT || 3000);