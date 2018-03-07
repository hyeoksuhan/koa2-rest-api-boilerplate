module.exports = {
  mongo: {
    host: 'localhost',
    database: 'api-dev'
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
};