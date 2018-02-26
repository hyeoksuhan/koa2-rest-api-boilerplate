module.exports = () => ({
  '/hello': {
    get: [
      async (ctx, next) => {
        ctx.body = 'hello';
        await next();
      },

      async ctx => {
        ctx.sendResult(ctx.body + ' koa');
      }
    ],

    post: async ctx => {
      ctx.sendResult('POST /hello');
    }
  }
});