const {mongoose} = require('../db');
const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: {}
});

module.exports = mongoose.model('User', schema);