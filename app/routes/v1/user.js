const jwt = require('jsonwebtoken');
const config = require('inheritable-config');

module.exports = (authCheck) => ({
  '/login': {
    post: async ctx => {
      const {email} = ctx.request.body;
      const token = jwt.sign({email}, config.jwtsecret, { expiresIn: '1m' });
      ctx.body = {token};
    }
  },

  '/users/me': {
    get: [
      authCheck(),
      async ctx => {
        ctx.body = {
          email: ctx.state.user.email
        };
      }]
  },
});