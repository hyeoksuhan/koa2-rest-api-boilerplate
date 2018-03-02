#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  node index.js
else
  NODE_ENV=development DEBUG=koa* node index.js
fi