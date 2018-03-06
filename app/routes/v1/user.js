const {secret, exp} = require('inheritable-config').jwt;

module.exports = ({UserService, JwtService}, errors, authCheck) => ({
  '/users': {
    get: async ctx => {
      const users = await UserService.get();
      ctx.body = users.map(({email, name}) => ({email, name}));
    },

    post: async ctx => {
      const {email, name='', password=''} = ctx.request.body;

      if (!await UserService.isEmailValid(email)) {
        throw errors.route_invalid_email;
      }

      if (await UserService.isPasswordShort(password)) {
        throw errors.route_short_password;
      }

      if (await UserService.isPasswordLong(password)) {
        throw errors.route_long_password;
      }

      try {
        const newuser = await UserService.create({email, name, password});
        ctx.body = {
          _id: newuser._id
        };
      } catch(e) {
        if (e.code === 11000) {
          e = errors.db_duplicate_email;
        }

        throw e;
      }
    }
  },

  '/login': {
    post: async ctx => {
      const {email, password} = ctx.request.body;

      if (!email) {
        throw errors.route_invalid_email;
      }

      if (!password) {
        throw errors.route_invalid_password;
      }

      const valid = await UserService.authenticate({email, password});
      if (!valid) {
        throw errors.login_auth_fail;
      }

      const _id = await UserService.getIdByEmail(email);
      const token = await JwtService.sign({
        payload: {_id},
        secret,
        exp
      });
      ctx.body = {token};
    }
  },

  '/users/me': {
    get: [
      authCheck(),
      async ctx => {
        const {_id} = ctx.state.user;
        const user = await UserService.getById(_id);

        if (!user) {
          throw errors.route_user_not_found;
        }

        ctx.body = {
          email: user.email,
          name: user.name
        };
      }]
  },
});