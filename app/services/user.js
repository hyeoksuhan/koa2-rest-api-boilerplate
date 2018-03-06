const {User} = require('../models');
const bcrypt = require('bcrypt');

const MIN_PASSWORD_LEN = 6;
const MAX_PASSWORD_LEN = 20;

const encryptPassword = Symbol();
const isEmailValid = Symbol();
const checkPasswordValidity = Symbol();

module.exports = class UserService {
  static async get() {
    return await User.find();
  };

  static async create({email='', password='', name=''}) {
    if (!await this[isEmailValid](email)) {
      throw new Error('Email is not valid');
    }

    const result = await this[checkPasswordValidity](password);
    if (result instanceof Error) {
      throw result;
    }

    password = await this[encryptPassword](password);

    return await User.create({email, password, name});
  };

  static async [isEmailValid](email) {
    return /^[A-Za-z0-9._+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/.test(email);
  }

  static async [encryptPassword](password) {
    return await bcrypt.hash(password, 10);
  };

  static async [checkPasswordValidity](password) {
    if (password.length < MIN_PASSWORD_LEN) {
      throw new Error('Password is short');
    }

    if (password.length > MAX_PASSWORD_LEN) {
      throw new Error('Password is long');
    }
  }
};