const {User} = require('../models');
const bcrypt = require('bcrypt');

const MIN_PASSWORD_LEN = 6;
const MAX_PASSWORD_LEN = 20;

const encryptPassword = Symbol();

module.exports = class UserService {
  static async get() {
    return await User.find();
  }

  static async getById(id) {
    return await User.findById(id);
  }

  static async create({name, email, password}) {
    password = await this[encryptPassword](password);
    return await User.create({email, password, name});
  }

  static async authenticate({email, password}) {
    const user = await User.findOne({email});
    if (user) {
      return await bcrypt.compare(password, user.password);
    }

    return false;
  }

  static async getIdByEmail(email) {
    const user = await User.findOne({email});
    return user && user._id;
  }

  static async isEmailValid(email) {
    return /^[A-Za-z0-9._+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/.test(email);
  }

  static async isPasswordShort(password) {
    return password.length < MIN_PASSWORD_LEN;
  }

  static async isPasswordLong(password) {
    return password.length > MAX_PASSWORD_LEN;
  }

  static async [encryptPassword](password) {
    return await bcrypt.hash(password, 10);
  }
}