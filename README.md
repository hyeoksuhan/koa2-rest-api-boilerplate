# koa2-rest-api-boilerplate
Rest api boilerplate based on koa2, koa-router and mongodb by using [koa2-rest-api](https://github.com/HanHyeoksu/koa2-rest-api) and the other modules.

## Structure
**Model**: [mongoose](http://mongoosejs.com/) model  
**Router**: receives request and send responses to client using services  
**Service**: responses to router or other services for its request using models and the others  
**Errors**: bad request error(4xx) table  

## Run
**On localhost**
```shell
$ npm install
$ npm start
```

or

```shell
$ yarn
$ yarn start
```

**On docker**
```shell
$ docker-compose up (with options)
```

## Test
**On localhost**
```shell
$ npm test
```

or

```shell
$ yarn test
```

**On docker**
```shell
$ npm run test-docker
```

or

```shell
$ yarn test-docker
```