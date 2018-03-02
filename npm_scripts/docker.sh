#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  NODE_ENV=prod-docker node ./app/index.js;
else
  NODE_ENV=dev-docker DEBUG=koa* nodemon ./app/index.js;
fi

echo $NODE_ENV