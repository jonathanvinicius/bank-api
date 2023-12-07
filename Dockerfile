FROM node:21-alpine3.18

RUN apk add --no-cache bash

RUN npm cache clean --force

RUN npm install -g npm

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
