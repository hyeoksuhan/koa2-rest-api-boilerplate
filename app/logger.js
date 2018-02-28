const log4js = require('koa-log4');

module.exports = (config) => {
  log4js.configure(config);
  return log4js.koaLogger(log4js.getLogger('koa'), {
    level: 'auto',
    format: (ctx, formatter) => {
      const m = {
        url: ctx.request.path,
        qs: JSON.stringify(ctx.request.querystring || {}),
        body: JSON.stringify(ctx.request.body || {}),
        resp: JSON.stringify(ctx.body || {})
      };

      let msg = `[:response-timems] :remote-addr - - :method ${m.url} HTTP/:http-version :status :content-length :referrer :user-agent\n`;
        msg += `\tI] q: ${m.qs} b: ${m.body}\n`;
        msg += `\tO] ${m.resp}\n`;

      return formatter(msg);
    }
  });
};