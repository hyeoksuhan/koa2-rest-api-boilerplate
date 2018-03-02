const koaRest = require('koa2-rest-api');
const RedisStore = require('koa-session-redis-store');
const config = require('config');
const sessions = config.sessions;

const app = koaRest.createApp({
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
  log4js: config.log4js,
  routes: require('./routes')
});

app.listen(process.env.PORT || 3000);