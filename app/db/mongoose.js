const mongoose = require('mongoose');

const _connect = mongoose.connect;
mongoose.connect = async function(config) {
  const uri = `mongodb://${config.host}:${config.port}/${config.database}`;

  try {
    await _connect.call(this, uri);
    console.log(`[${Date.now()}] mongodb connected: ${uri}`);
  } catch (err) {
    console.error(`[${Date.now()}] mongodb failed to connect: ${uri}, caused by: ${err.message}`);

    if (err.message.match(/failed to connect to server .* on first connect/)) {
      setTimeout(() => {
        console.log(`[${Date.now()}] Retry to connect to mongodb`);
        mongoose.connect(config);
      }, config.reconnect_period);
    }
  }
};

mongoose.close = mongoose.connection.close.bind(mongoose.connection);

module.exports = mongoose;