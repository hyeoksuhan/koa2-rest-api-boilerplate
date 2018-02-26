import Koa from 'koa';
import Router from 'koa-router';
import compose from 'koa-compose';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import parse from 'co-body';

import config from 'config';

const routes = require('./routes');

function routing(routes, config) {
  const rootRouter = Router({
    prefix: config.prefix
  });
  const subRouters = [];
  Object.keys(routes).forEach(prefix => {
    const router = new Router({prefix});
    router.authCheck = () => jwt({ secret: config.jwtsecret });
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

module.exports = (config) => {
  const app = new Koa();

  app.use(require('./response'));
  app.use(require('./error_handler'));
  app.use(helmet());
  app.use(bodyParser());
  app.use(routing(routes, config));

  return app;
}
