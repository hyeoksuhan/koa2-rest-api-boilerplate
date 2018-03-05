const jwt = require('jsonwebtoken');
const config = require('inheritable-config');

module.exports = ({UserService}, authCheck) => ({
  '/users': {
    get: async ctx => {
      ctx.body = await UserService.get();
    },

    post: async ctx => {
      const {email, name, password} = ctx.request.body;

      if (!(email && password)) {
        return ctx.sendError(400, new Error('Email or password is empty'));
      }

      ctx.body = await UserService.create({email, name, password});
    }
  },

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