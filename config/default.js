module.exports = {
  jwt: {
    secret: 'qwer123!@zzzfgrz99423@#',
    exp: '1h'
  },
  sessions: {
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
  },
  mongo: {
    port: 27017,
    reconnect_period: 5*1000
  }
};