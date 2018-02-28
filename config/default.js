module.exports = {
  jwtsecret: 'qwer123!@zzzfgrz99423@#',
  sessions: {
    redishost: 'redis',
    resave: false,
    maxage: 60*60*1000
  },
  log4js: {
    appenders:{
      console: {
        type: 'console'
      }
    },
    categories: {
      koa: {
        appenders: ['console'],
        level: 'all'
      },
      default: {
        appenders: ['console'],
        level: 'info'
      }
    },
    replaceConsole: false
  }
}