const strings = {
  route_invalid_email: {
    desc: 'Email is empty or invalid'
  },
  route_short_password: {
    desc: 'Password is too short'
  },
  route_long_password: {
    desc: 'Password is too long'
  },
  route_invalid_password: {
    desc: 'Password is empty or invalid'
  },
  route_user_not_found: {
    status: 404,
    desc: 'User not found'
  },
  login_auth_fail: {
    status: 401,
    desc: 'Email and password is not matched'
  },
  db_duplicate_email: {
    desc: 'User email is already exist'
  }
};

class BadRequestError extends Error {
  constructor(status=400, code, desc) {
    super(desc);
    this.status = status;
    this.code = code;
  }
}

Object.keys(strings).forEach(code => {
  const {status, desc} = strings[code];
  exports[code] = new BadRequestError(status, code, desc);
});