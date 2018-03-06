#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  node ./app/index.js
else
  NODE_ENV=development DEBUG=koa* nodemon ./app/index.js
fi
