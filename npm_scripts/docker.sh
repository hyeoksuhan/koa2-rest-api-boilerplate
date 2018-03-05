#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  NODE_ENV=docker:production node ./app/index.js;
else
  NODE_ENV=docker:development DEBUG=koa* nodemon ./app/index.js;
fi

echo $NODE_ENV