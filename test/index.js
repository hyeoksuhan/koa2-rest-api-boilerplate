require('module-alias/register');

const app = require('@app');
const {mongoose} = app;

function cleanup(done) {
  // drop database
  mongoose.connection.db.dropDatabase()
  .then(() => done());
}

before(function(done) {
  this.timeout(5*1000);
  cleanup = cleanup.bind(null, done);

  if (mongoose.connection.isOpened()) {
    cleanup();
  }

  mongoose.connection.once('open', cleanup);
});

after(() => {
  app.shutdownServer();
});

exports.helper = require('./helper')(app);