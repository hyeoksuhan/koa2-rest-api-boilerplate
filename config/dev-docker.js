// based on development configs
module.exports = Object.assign(require('./development'), {
  sessions: {
    redishost: 'redis'
  }
});