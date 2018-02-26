module.exports = async function(ctx, next) {
  ctx.sendError = function(status, err) {
    if (!err) {
      err = status;
    }

    if (!(err instanceof Error)) {
      err = new Error(err);
    }

    this.status = status || err.status || 500;
    this.body = {
      error_code: err.code || 'Error',
      description: err.message
    };
  }

  ctx.sendResult = function(result) {
    this.status = 200;

    if (typeof result !== 'object') {
      this.body = {result};
    } else {
      this.body = result;
    }
  }

  await next();
};