const jwt = require('jsonwebtoken');
const config = require('inheritable-config');

module.exports = ({UserService}, authCheck) => ({
  '/users': {
    get: async ctx => {
      const users = await UserService.get();
      ctx.body = users.map(({email, name}) => ({email, name}));
    },

    post: async ctx => {
      const {email, name, password} = ctx.request.body;
      const newuser = await UserService.create({email, name, password});
      ctx.body = {
        _id: newuser._id
      };
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