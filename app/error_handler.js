const errors = require('./errors');

module.exports = async (ctx, next) => {
  try {
    await next();

    switch (ctx.status) {
      case 404:
        throw errors.route_missing_api;
      case 405:
        throw errors.route_not_allowed_method;
      default:
        break;
    }
  } catch (err) {
    if (err.status === 401) {
      err = errors.route_not_logged_in;
    }

    ctx.sendError(err.status, err);
  }
}