const app = require('../app');
const {mongo} = app;

function cleanup(done) {
  // drop database
  mongo.connection.db.dropDatabase()
  .then(() => done());
}

before(function(done) {
  this.timeout(5*1000);
  cleanup = cleanup.bind(null, done);

  if (mongo.connection.isOpened()) {
    cleanup();
  }

  mongo.connection.once('open', cleanup);
});

after(() => {
  app.shutdownServer();
});