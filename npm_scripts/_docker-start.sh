#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  NODE_ENV=docker:production node ./app/index.js
else
  NODE_ENV=docker:development DEBUG=koa* ./node_modules/.bin/nodemon --legacy-watch ./app/index.js
fi