const {User} = require('../models');

module.exports = class UserService {
  static async get() {
    return await User.find();
  };

  static async create(userInfo) {
    return await User.create(userInfo);
  };
};