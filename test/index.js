const app = require('../app');
const {mongo} = app;

before((done) => {
  if (mongo.connection.isOpened()) {
    return done();
  }

  mongo.connection.once('open', done);
});

after(() => {
  app.shutdownServer();
});