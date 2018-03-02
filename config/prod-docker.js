// based on production configs
module.exports = Object.assign(require('./production'), {
  sessions: {
    redishost: 'redis'
  }
});