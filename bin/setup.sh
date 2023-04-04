#!/bin/sh

nvm use
npm i
touch .env
cat .env.sample > .env