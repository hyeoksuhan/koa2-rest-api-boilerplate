const Koa = require('koa');
const Router = require('koa-router');
const compose = require('koa-compose');
const helmet = require('koa-helmet');
const jwt = require('koa-jwt');
const parse = require('co-body');
const session = require('koa-session');

const config = require('config');
const debug = require('debug')('koa2-rest-api-boilerplate');
const routes = require('./routes');

function routing(routes, {prefix, jwtsecret}) {
  const rootRouter = Router({prefix});
  const subRouters = [];
  Object.keys(routes).forEach(prefix => {
    const router = new Router({prefix});
    router.authCheck = () => jwt({ secret: jwtsecret });
    subRouters.push(router);

    const route = routes[prefix];
    route(router);
  });

  rootRouter.use.apply(rootRouter, subRouters.map(r => r.routes()));

  return compose([
    rootRouter.routes(),
    rootRouter.allowedMethods(),
  ]);
}

function bodyParser() {
  return async (ctx, next) => {
    ctx.request.body = await parse.json(ctx);
    await next();
  };
}

module.exports = ({
  prefix = '',
  jwtsecret = '__jwt_secret__',
  cookieSignKeys = ['__cookie_sign_keys__'],
  sessions = undefined
}) => {
  const app = new Koa();

  app.keys = cookieSignKeys;

  app.use(require('./response'));
  app.use(require('./error_handler'));
  app.use(helmet());

  if (sessions) {
    app.use(session(app, sessions));
  }

  app.use(bodyParser());
  app.use(routing(routes, {prefix, jwtsecret}));

  return app;
}