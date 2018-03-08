# koa2-rest-api-boilerplate
[![node][node-image]][node-url]
[![Build Status][travis-image]][travis-url]

[node-image]: https://img.shields.io/badge/node-%3E%3D%208.1.4-brightgreen.svg
[node-url]: https://nodejs.org
[travis-image]: https://travis-ci.org/HanHyeoksu/koa2-rest-api-boilerplate.svg?branch=master
[travis-url]: https://travis-ci.org/HanHyeoksu/koa2-rest-api-boilerplate

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
$ npm run docker-start
```

or

```shell
$ yarn docker-start
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
$ npm run docker-test
```

or

```shell
$ yarn docker-test
```
