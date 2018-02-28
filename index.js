require('babel-polyfill');
require('babel-register')({
	ignore: /node_modules\/(?!koa)/
});

const RedisStore = require('koa-session-redis-store');
const config = require('config');
const sessions = config.sessions;

const app = require('./app')({
  jwtsecret: config.jwtsecret,
  prefix: '/api',
  cookieSignKeys: ['secret', 'keys'],
  sessions: {
    store: new RedisStore({
      host: sessions.redishost
    }),
    rolling: sessions.resave,
    maxAge: sessions.maxage,
  },
  log4js: config.log4js
});

app.listen(process.env.PORT || 3000);