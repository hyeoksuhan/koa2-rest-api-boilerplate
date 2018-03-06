const jwt = require('jsonwebtoken');

module.exports = class JwtService {
  static async sign({payload, secret, exp}) {
    const opts = exp ? {expiresIn: exp} : {};
    return jwt.sign(payload, secret, opts);
  }
}