module.exports = {
  '/views': {
    get: async ctx => {
      let n = ~~ctx.session.views;
      ctx.session.views = ++n;
      ctx.sendResult(n + ' views');
    }
  }
};