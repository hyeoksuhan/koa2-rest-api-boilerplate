const Promise = require('bluebird');

const {request, should, fail, models, services} = require('../helper');
const email = 'hyeoksu.han@gmail.com';
const password = '12345a';

describe('routes/user', () => {
  const path = '/users';
  const {MIN_PASSWORD_LEN, MAX_PASSWORD_LEN} = services.UserService;

  describe('POST /users', () => {
    it('should throw route_invalid_email error when email is empty or invalid', () => {
      return Promise.each([
        '',
        'test',
        'test@',
        'test@test',
        'test@test.',
        't#est@test.com'
      ], email =>
        request.post(path, {email, password})
        .then(fail)
        .catch(e => {
          e.status.should.eql(400);
          e.code.should.eql('route_invalid_email');
        })
      );
    });

    it(`should throw route_short_password when password.length < ${MIN_PASSWORD_LEN}`, () => {
      return Promise.each([
        '',
        '12345',
        'abcde',
        'abc12'
      ], pw =>
        request.post(path, {email, pw})
        .then(fail)
        .catch(e => {
          e.status.should.eql(400);
          e.code.should.eql('route_short_password');
        })
     ); 
    });

    it(`should throw route_long_password when password.length > ${MAX_PASSWORD_LEN}`, () => {
      // This is slower way than using for loop
      const longPassword = Array.from({length:MAX_PASSWORD_LEN}).reduce(r => r + 'a', 1);

      return request.post(path, {email, password: longPassword})
        .then(fail)
        .catch(e => {
          e.status.should.eql(400);
          e.code.should.eql('route_long_password');
        });
    });

    it(`should throw db_duplicate_email error when user is already exist`, async () => {
      await request.post(path, {email, password});
      try {
        await request.post(path, {email, password});
        fail();
      } catch({status, code}) {
        status.should.eql(400);
        code.should.eql('db_duplicate_email');
      }

      await models.User.remove();
    });

    it(`should create new user`, async () => {
      const response = await request.post(path, {email, password});

      response.status.should.eql(200);
      should.exist(response.body._id);
      should.not.exist(response.body.password);

      await models.User.remove();
    });
  });

  describe('GET /users', async () => {
    it('should get all users', async () => {
      await models.User.create([
        {email, password},
        {email: email+'1', password}
      ]);

      const response = await request.get(path);
      response.body.should.have.lengthOf(2);

      await models.User.remove();
    });
  });

  describe('POST /login', async () => {
    const path = '/login';

    it('should throw route_invalid_email error when email is empty', async () => {
      try {
        await request.post(path, {password});
        fail();
      } catch({status, code}) {
        status.should.eql(400);
        code.should.eql('route_invalid_email');
      }
    });

    it('should throw route_invalid_password error when password is empty', async () => {
      try {
        await request.post(path, {email});
        fail();
      } catch({status, code}) {
        status.should.eql(400);
        code.should.eql('route_invalid_password');
      }
    });

    it('should throw login_auth_fail error when user is not exist', async () => {
      try {
        await request.post(path, {email, password});
        fail();
      } catch({status, code}) {
        status.should.eql(400);
        code.should.eql('login_auth_fail');
      }
    });

    it('should throw login_auth_fail error when password is not matched', async () => {
      try {
        await services.UserService.create({
          email, password
        });

        await request.post(path, {email, password: password + 1});
        fail();
      } catch({status, code}) {
        status.should.eql(400);
        code.should.eql('login_auth_fail');

        await models.User.remove();
      }
    });

    it('should return token when login is success', async () => {
      await services.UserService.create({
        email, password
      });

      const response = await request.post(path, {email, password});
      response.status.should.eql(200);
      should.exist(response.body.token);

      await models.User.remove();
    });
  });

  describe('POST /users/me', () => {
    const path = '/users/me';

    it('should throw route_not_logged_in error when token is invalid', async () => {
      try {
        await request.get(path)
          .set('authorization', 'Bearer invalid_token');

        fail();
      } catch({status, code}) {
        status.should.eql(401);
        code.should.eql('route_not_logged_in');
      }
    });

    it('should return user info when token is valid', async () => {
      await services.UserService.create({
        name:'hshan', email, password
      });

      const {body: {token}} = await request.post('/login', {email, password});
      const {status, body} = await request.get(path)
        .set('authorization', 'Bearer ' + token);

      status.should.eql(200);
      body.email.should.eql(email);
      body.name.should.eql('hshan');
      should.not.exist(body.password);

      await models.User.remove();
    });
  });
});