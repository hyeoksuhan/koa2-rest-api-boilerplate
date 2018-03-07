module.exports = {
  jwt: {
    secret: 'qwer123!@zzzfgrz99423@#',
    exp: '1h'
  },
  sessions: {
    resave: false,
    maxage: 60*60*1000
  },
  mongo: {
    port: 27017,
    reconnect_period: 5*1000
  }
};