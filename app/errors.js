const table = {
  route_invalid_data: {
    desc: 'The body data is empty or invalid',
  },
  route_not_logged_in: {
    status: 401,
    desc: 'Login is required',
  },
  route_missing_api: {
    desc: 'The api is not found',
  },
  route_not_allowed_method: {
    desc: 'The method is not allowed'
  }
};

Object.keys(table).forEach(code => {
  const {status=400, desc} = table[code];

  const error = new Error(desc);
  error.status = status;
  error.code = code;

  exports[code] = error;
});