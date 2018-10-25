FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app


EXPOSE 3000

ARG profile

ENV NODE_PROFILE=${profile}

CMD npm run $NODE_PROFILE